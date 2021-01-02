import React, { useEffect, useState } from 'react';
import Playlist from '../../components/Playlist';
import { Spotify } from '../../services/spotifyApi';

import { FeaturedPlaylist, Section, Sections } from './styles';

const Home: React.FC = () => {
  const [resources, setResources] = useState<{
    artists?: { [key: string]: any };
    featured_playlist?: { [key: string]: any };
    playlists?: Array<{ [key: string]: any }>;
  }>({});

  const getResources = async (): Promise<void> => {
    const fp = await Spotify({
      method: 'get',
      url: '/browse/featured-playlists',
    });

    const { data: user }: any = await Spotify({
      method: 'get',
      url: '/me',
    });

    const { data: playlists }: any = await Spotify({
      method: 'get',
      url: `/users/${user?.id}/playlists`,
    });

    setResources((state) => ({
      ...state,
      featured_playlist: fp.data.playlists.items[0],
      playlists: playlists.items,
    }));
  };

  useEffect(() => {
    getResources();
  }, []);
  return (
    <>
      <FeaturedPlaylist>
        <div
          className="background"
          style={{
            background: `url(${resources.featured_playlist?.images[0].url}) no-repeat center`,
          }}
        >
          <div className="blur"></div>
        </div>

        <div className="fp-content">
          <img
            src={resources.featured_playlist?.images[0].url}
            alt="playlist"
          />
          <div className="info">
            <h6>PLAYLIST</h6>
            <h3 className="playlist-name">
              {resources.featured_playlist?.name}
            </h3>

            <span className="description">
              {resources.featured_playlist?.description}
            </span>

            <button>PLAY</button>
          </div>
        </div>
      </FeaturedPlaylist>
      <Sections>
        <Section>
          <h3 className="title">My playlists</h3>
          <ul className="items">
            {resources.playlists?.map((p) => (
              <li>
                <Playlist playlist={p} />
              </li>
            ))}
          </ul>
        </Section>
      </Sections>
    </>
  );
};

export default Home;
