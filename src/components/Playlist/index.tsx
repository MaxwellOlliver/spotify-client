import React from 'react';

import { Container } from './styles';

const Playlist: React.FC<{
  mode?: string;
  uri?: string;
  style?: { [key: string]: any };
  playlist: { [key: string]: any };
}> = ({ mode = 'express', playlist }) => {
  return mode === 'express' ? (
    <Container>
      <img src={playlist.images[0].url} alt="playlist" />
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
