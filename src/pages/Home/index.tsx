import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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

  const playFpPlaylist = async () => {
    await Spotify({
      method: 'put',
      url: '/me/player/play',
      data: {
        context_uri: resources.featured_playlist?.uri || null,
      },
    });
  };

  const goToEnd = (id: string) => {
    const ul = document.querySelector(`#${id}`);

    if (ul) {
      ul.scrollLeft = ul.scrollWidth;
    }
  };

  const goToStart = (id: string) => {
    const ul = document.querySelector(`#${id}`);

    if (ul) {
      ul.scrollLeft -= ul.scrollWidth;
    }
  };
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

            <button onClick={playFpPlaylist}>PLAY</button>
          </div>
        </div>
      </FeaturedPlaylist>
      <Sections>
        <Section>
          <div className="title">
            <h3 className="title">My playlists</h3>
            <div className="chevrons">
              <FiChevronLeft
                size={25}
                color="#fff"
                onClick={() => goToStart('section_my-playlists-ul')}
              />
              <FiChevronRight
                size={25}
                color="#fff"
                onClick={() => goToEnd('section_my-playlists-ul')}
              />
            </div>
          </div>
          <ul className="items" id="section_my-playlists-ul">
            {resources.playlists?.map((p) => (
              <li key={p.id}>
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
