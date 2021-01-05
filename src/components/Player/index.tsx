import React, { useEffect, useRef } from 'react';

import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { BiRepeat, BiShuffle } from 'react-icons/bi';

import { Spotify } from '../../services/spotifyApi';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { PlayerAction } from '../../store/modules/player/actions';

const Player: React.FC = () => {
  const player: any = useSelector((state: any) => state.player);
  const dispatch: Dispatch = useDispatch();

  const fillRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function getResources(): Promise<void> {
    const { data: playerInfo }: any = await Spotify({
      method: 'get',
      url: '/me/player',
    });

    if (playerInfo) {
      dispatch({
        type: PlayerAction.SET_CURRENTLY_PLAYER,
        payload: {
          is_playing: playerInfo.is_playing,
          selected_device: playerInfo.device,
          shuffle: playerInfo.shuffle_state,
          repeat: playerInfo.repeat_state,
          music: playerInfo.item,
          volume: playerInfo.device?.volume_percent,
          progress: playerInfo.progress_ms,
        },
      });
    }
  }

  async function setBar() {
    if (fillRef.current && inputRef.current) {
      fillRef.current.style.width = `${inputRef.current.value}%`;

      const ms = Math.round(
        (Number(inputRef.current.value) * player.music.duration_ms) / 100
      );
      await Spotify({
        method: 'put',
        url: `/me/player/seek?position_ms=${ms}`,
      });
      dispatch({
        type: PlayerAction.SET_PROGRESS,
        payload: {
          progress: ms,
        },
      });
    }
  }

  useEffect(() => {
    getResources();
  }, []);

  useEffect(() => {
    const t = setInterval(getCurrentlyMusic, 3000);

    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (fillRef.current && inputRef.current) {
      const value = (100 * player.progress) / player.music.duration_ms;

      fillRef.current.style.width = `${value}%`;
      inputRef.current.value = String(value);
    }
  }, [player.progress]);

  async function playPlayback(): Promise<void> {
    Spotify({
      method: 'put',
      url: `/me/player/play?device_id=${player.selected_device.id}`,
    });

    dispatch({ type: PlayerAction.PLAY });
  }

  async function pausePlayback(): Promise<void> {
    Spotify({
      method: 'put',
      url: '/me/player/pause',
    });

    dispatch({ type: PlayerAction.PAUSE });
  }

  async function nextInQueue(): Promise<void> {
    await Spotify({
      method: 'post',
      url: '/me/player/next',
    });
  }

  async function previousInQueue(): Promise<void> {
    Spotify({
      method: 'post',
      url: '/me/player/previous',
    });
  }

  async function shufflePlayblack(): Promise<void> {
    Spotify({
      method: 'put',
      url: `/me/player/shuffle?state=${player?.shuffle ? false : true}`,
    });

    dispatch({
      type: PlayerAction.SHUFFLE,
      payload: { shuffle: player?.shuffle ? false : true },
    });
  }

  const getCurrentlyMusic = async () => {
    const { data: currentlyMusic }: any = await Spotify({
      method: 'get',
      url: `/me/player/currently-playing?market=BR`,
    });

    console.log(currentlyMusic);

    dispatch({
      type: PlayerAction.SET_MUSIC,
      payload: { music: currentlyMusic.item },
    });
    dispatch({
      type: PlayerAction.SET_PROGRESS,
      payload: { progress: currentlyMusic.progress_ms },
    });
    if (currentlyMusic.is_playing) {
      dispatch({ type: PlayerAction.PLAY });
    } else {
      dispatch({ type: PlayerAction.PAUSE });
    }
  };

  async function repeat(): Promise<void> {
    const state =
      player.repeat === 'off'
        ? 'context'
        : player.repeat === 'context'
        ? 'track'
        : player.repeat === 'track' && 'off';
    Spotify({
      method: 'put',
      url: `/me/player/repeat?state=${state}`,
    });

    dispatch({ type: PlayerAction.REPEAT, payload: { repeat: state } });
  }

  return player.music ? (
    <div className="player-info">
      <span className="playing-now">Ouvindo agora</span>
      <img src={player?.music?.album?.images[0].url} alt="album" />
      <span className="music-title">{player?.music?.name}</span>
      <span className="artists">
        {player?.music?.artists?.map((art: any) => art.name).join(', ')}
      </span>
      <div className="controllers">
        <BiShuffle
          size={18}
          color="#fff"
          className={player?.shuffle ? 'active-bi' : ''}
          onClick={shufflePlayblack}
        />
        <FiSkipBack size={18} color="#fff" onClick={previousInQueue} />
        {player?.is_playing ? (
          <FiPause size={22} color="#fff" onClick={pausePlayback} />
        ) : (
          <FiPlay size={22} color="#fff" onClick={playPlayback} />
        )}
        <FiSkipForward size={18} color="#fff" onClick={nextInQueue} />
        <div className="repeat" onClick={repeat}>
          {player?.repeat === 'off' ? (
            <BiRepeat size={18} color="#fff" />
          ) : (
            <BiRepeat size={18} color="#fff" className="active-bi" />
          )}
          {player?.repeat === 'track' && (
            <div className="repeat-balloon">1</div>
          )}
        </div>
      </div>
      <div className="slider-container">
        <span className="bar">
          <span className="fill" ref={fillRef}></span>
        </span>
        <input
          type="range"
          name="time"
          id="time"
          min={0}
          max={100}
          step={0.1}
          ref={inputRef}
          onChange={setBar}
        />
      </div>
    </div>
  ) : null;
};

export default Player;
