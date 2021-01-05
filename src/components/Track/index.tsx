import React, { useState } from 'react';
import { FiPlay } from 'react-icons/fi';
import { Spotify } from '../../services/spotifyApi';

import { Container } from './styles';

const Track: React.FC<{
  style?: { [key: string]: any };
  track: { [key: string]: any };
}> = ({ track }) => {
  const [hover, setHover] = useState(false);

  const playtrack = async () => {
    console.log(track);
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
  };
  return (
    <Container
      hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="img">
        <div className="hover">
          <FiPlay size={45} color="#fff" onClick={playtrack} />
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
