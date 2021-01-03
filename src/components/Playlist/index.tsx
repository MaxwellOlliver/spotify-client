import React, { useState } from 'react';
import { FiPlay } from 'react-icons/fi';
import { Spotify } from '../../services/spotifyApi';

import { Container } from './styles';

const Playlist: React.FC<{
  mode?: string;
  uri?: string;
  style?: { [key: string]: any };
  playlist: { [key: string]: any };
}> = ({ mode = 'express', playlist }) => {
  const [hover, setHover] = useState(false);

  const playPlaylist = async () => {
    await Spotify({
      method: 'put',
      url: '/me/player/play',
      data: {
        context_uri: playlist.uri,
      },
    });
  };
  return mode === 'express' ? (
    <Container
      hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="img">
        <div className="hover">
          <FiPlay size={45} color="#fff" onClick={playPlaylist} />
        </div>
        <img src={playlist.images[0].url} alt="playlist" />
      </div>
      <div className="info">
        <h3>{playlist.name}</h3>
        <span>{playlist.description}</span>
      </div>
    </Container>
  ) : (
    <div></div>
  );
};

export default Playlist;
