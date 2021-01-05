import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import Track from '../../components/Track';
import { Spotify } from '../../services/spotifyApi';

import { Container } from './styles';

const RecentlyPlayed: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const getRecentlyPlayed = async () => {
    const { data: rp } = await Spotify({
      method: 'get',
      url: '/me/player/recently-played?limit=25',
    });

    setRecentlyPlayed(rp.items);
    setIsLoading(false);
  };

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h3 style={{ fontSize: '30px', margin: '30px' }}>
        Recently played tracks
      </h3>
      <Container className="tracks">
        {recentlyPlayed.map((t: any, index) => (
          <li key={index}>
            <Track track={t.track} />
          </li>
        ))}
      </Container>
    </>
  );
};

export default RecentlyPlayed;
