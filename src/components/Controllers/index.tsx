import React, { useEffect, useRef, useState } from 'react';
import {
  FiAirplay,
  FiMusic,
  FiTablet,
  FiVolume1,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Spotify } from '../../services/spotifyApi';
import { PlayerAction } from '../../store/modules/player/actions';

import desktop from '../../assets/desktop.png';

import { Container } from './styles';
import { BiDesktop } from 'react-icons/bi';
import { AiOutlineDesktop } from 'react-icons/ai';

const Controllers: React.FC = () => {
  const player: any = useSelector((state) => state);
  const dispatch = useDispatch();

  const [volumeModal, setVolumeModal] = useState(false);
  const [devicesModal, setDevicesModal] = useState(false);
  const [devices, setDevices] = useState([]);

  const fillRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function setVolume() {
    if (fillRef.current && inputRef.current) {
      fillRef.current.style.width = `${inputRef.current.value}%`;

      await Spotify({
        method: 'put',
        url: `/me/player/volume?volume_percent=${inputRef.current.value}&device_id=${player.selected_device.id}`,
      });
      dispatch({
        type: PlayerAction.SET_VOLUME,
        payload: {
          volume: inputRef.current.value,
        },
      });
    }
  }

  function openVolumeModal() {
    if (volumeModal) {
      setVolumeModal(false);
    } else {
      setVolumeModal(true);
    }
  }

  async function openDevicesModal() {
    if (devicesModal) {
      setDevicesModal(false);
    } else {
      const {
        data: { devices },
      }: any = await Spotify({
        method: 'get',
        url: '/me/player/devices',
      });

      setDevices(devices);
      setDevicesModal(true);
    }
  }

  async function transferPlayback(device: any) {
    await Spotify({
      method: 'put',
      url: '/me/player',
      data: {
        device_ids: [device.id],
      },
    });

    setDevices((devicesState: any) => {
      const deviceActive = devicesState.map((d: any) => {
        if (d.id === device.id) {
          d.is_active = true;

          return d;
        }

        if (d.id === player.selected_device.id) {
          d.is_active = false;

          return d;
        }

        return d;
      });

      return deviceActive;
    });

    dispatch({ type: PlayerAction.SET_SELECTED_DEVICE, payload: { device } });
    dispatch({
      type: PlayerAction.SET_VOLUME,
      payload: { volume: device.volume_percent },
    });
  }

  useEffect(() => {
    let volume = document.querySelector('.volume');
    let devices = document.querySelector('.devices');

    document.addEventListener('click', (e: any) => {
      if (volume && !volume.contains(e.target)) {
        setVolumeModal(false);
      }

      if (devices && !devices.contains(e.target)) {
        setDevicesModal(false);
      }
    });

    return () => {
      let volume = document.querySelector('.volume');

      document.removeEventListener('click', (e: any) => {
        if (volume && !volume.contains(e.target)) {
          setVolumeModal(false);
        }

        if (devices && !devices.contains(e.target)) {
          setDevicesModal(false);
        }
      });
    };
  }, []);
  return (
    <Container>
      <div className="volume">
        {player.volume > 50 ? (
          <FiVolume2
            size={20}
            color="#fff"
            title={
              player.selected_device.type === 'Smartphone'
                ? 'Não é possível controlar o volume em aparelhos móveis'
                : ''
            }
            className={
              player.selected_device.type === 'Smartphone' ? 'is-smart' : ''
            }
            onClick={
              player.selected_device.type === 'Smartphone'
                ? () => {}
                : openVolumeModal
            }
          />
        ) : player.volume < 1 ? (
          <FiVolumeX
            size={20}
            color="#fff"
            title={
              player.selected_device.type === 'Smartphone'
                ? 'Não é possível controlar o volume em aparelhos móveis'
                : ''
            }
            className={
              player.selected_device.type === 'Smartphone' ? 'is-smart' : ''
            }
            onClick={
              player.selected_device.type === 'Smartphone'
                ? () => {}
                : openVolumeModal
            }
          />
        ) : (
          <FiVolume1
            size={20}
            color="#fff"
            title={
              player.selected_device.type === 'Smartphone'
                ? 'Não é possível controlar o volume em aparelhos móveis'
                : ''
            }
            className={
              player.selected_device.type === 'Smartphone' ? 'is-smart' : ''
            }
            onClick={
              player.selected_device.type === 'Smartphone'
                ? () => {}
                : openVolumeModal
            }
          />
        )}
        {volumeModal && (
          <div className="volume-container">
            <div className="slider-container">
              <span className="bar">
                <span
                  className="fill"
                  style={{ width: `${player.volume}%` }}
                  ref={fillRef}
                ></span>
              </span>
              <input
                type="range"
                name="time"
                id="time"
                min={0}
                max={100}
                step={1}
                ref={inputRef}
                defaultValue={player.volume}
                onChange={setVolume}
              />
            </div>
          </div>
        )}
      </div>
      <div className="devices">
        <FiAirplay size={20} color="#fff" onClick={openDevicesModal} />

        {devicesModal && (
          <div className="devices-container">
            <h3>Conectar a um dispositivo</h3>
            <img src={desktop} alt="desktop" />
            <ul className="devices">
              <li className="active" key={player?.selected_device.id}>
                {player?.selected_device.type === 'Computer' ? (
                  <AiOutlineDesktop size={30} color="#fff" className="fill" />
                ) : (
                  <FiTablet size={30} color="#fff" />
                )}

                <div className="info">
                  <h3>Ouvindo em {player?.selected_device.name}</h3>
                  <div>
                    <FiMusic size={14} color="#fff" />
                    <span>Spotify connect</span>
                  </div>
                </div>
              </li>
              {devices.map((device: any) => {
                if (!device.is_active) {
                  return (
                    <li
                      key={device.id}
                      onClick={() => transferPlayback(device)}
                    >
                      <FiTablet size={30} color="#fff" />
                      <div className="info">
                        <h3>{device.name}</h3>
                        <div>
                          <FiMusic size={14} color="#fff" />
                          <span>Spotify connect</span>
                        </div>
                      </div>
                    </li>
                  );
                }

                return null;
              })}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Controllers;
