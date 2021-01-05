import React, { useState } from 'react';
import { FiPlay } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Spotify } from '../../services/spotifyApi';

import { Container } from './styles';

import Playing from '../../assets/audio.svg';
import { PlayerAction } from '../../store/modules/player/actions';

const Track: React.FC<{
  style?: { [key: string]: any };
  track: { [key: string]: any };
}> = ({ track }) => {
  const [hover, setHover] = useState(false);
  const player: any = useSelector((state: any) => state.player);
  const dispatch = useDispatch();

  const playtrack = async () => {
    await Spotify({
      method: 'put',
      url: '/me/player/play',
      data: {
        context_uri: track.album.uri,
        offset: {
          position: track.track_number - 1,
        },
      },
    });

    dispatch({ type: PlayerAction.SET_MUSIC, payload: { music: track } });
  };
  return (
    <Container
      hover={hover}
      playingNow={player.music?.id === track.id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="img">
        <div className="hover">
          {player.music?.id === track.id ? (
            <img src={Playing} alt="playing" />
          ) : (
            <FiPlay size={45} color="#fff" onClick={playtrack} />
          )}
        </div>
        <img src={track.album.images[0].url} alt="track" />
      </div>
      <div className="info">
        <h3>{track.name}</h3>
        <span>{track.artists.map((art: any) => art.name).join(', ')}</span>
      </div>
    </Container>
  );
};

export default Track;
