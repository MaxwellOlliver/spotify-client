import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Playlist from '../../components/Playlist';
import Track from '../../components/Track';
import { Spotify } from '../../services/spotifyApi';

import { FeaturedPlaylist, Section, Sections } from './styles';

const Home: React.FC = () => {
  const [resources, setResources] = useState<{
    artists: { [key: string]: any };
    recentlyPlayed: Array<{ [key: string]: any }>;
    featuredPlaylists: Array<{ [key: string]: any }>;
    playlists: Array<{ [key: string]: any }>;
  }>({
    artists: {},
    recentlyPlayed: [],
    featuredPlaylists: [],
    playlists: [],
  });

  const getResources = async (): Promise<void> => {
    const fp = await Spotify({
      method: 'get',
      url: '/browse/featured-playlists?limit=10',
    });

    const { data: user }: any = await Spotify({
      method: 'get',
      url: '/me',
    });

    const { data: playlists }: any = await Spotify({
      method: 'get',
      url: `/users/${user?.id}/playlists?limit=10`,
    });

    const { data: recentlyPlayed }: any = await Spotify({
      method: 'get',
      url: `/me/player/recently-played?limit=10`,
    });

    setResources((state) => ({
      ...state,
      featuredPlaylists: fp.data.playlists.items,
      playlists: playlists.items,
      recentlyPlayed: recentlyPlayed.items,
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
        context_uri: resources.featuredPlaylists[0]?.uri || null,
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
            background: `url(${resources.featuredPlaylists[0]?.images[0].url}) no-repeat center`,
          }}
        >
          <div className="blur"></div>
        </div>

        <div className="fp-content">
          <img
            src={resources.featuredPlaylists[0]?.images[0].url}
            alt="playlist"
          />
          <div className="info">
            <h6>PLAYLIST</h6>
            <h3 className="playlist-name">
              {resources.featuredPlaylists[0]?.name}
            </h3>

            <span className="description">
              {resources.featuredPlaylists[0]?.description}
            </span>

            <button onClick={playFpPlaylist}>PLAY</button>
          </div>
        </div>
      </FeaturedPlaylist>
      <Sections>
        <Section>
          <div className="title">
            <h3 className="title">Featured playlists</h3>
            <div className="chevrons">
              <FiChevronLeft
                size={25}
                color="#fff"
                onClick={() => goToStart('section_featured-playlists-ul')}
              />
              <FiChevronRight
                size={25}
                color="#fff"
                onClick={() => goToEnd('section_featured-playlists-ul')}
              />
            </div>
          </div>
          <ul className="items" id="section_featured-playlists-ul">
            {resources.featuredPlaylists?.map((p) => (
              <li key={p.id}>
                <Playlist playlist={p} />
              </li>
            ))}
          </ul>
        </Section>
        <Section>
          <div className="title">
            <h3 className="title">Recently played</h3>
            <div className="chevrons">
              <FiChevronLeft
                size={25}
                color="#fff"
                onClick={() => goToStart('section_recently-played-ul')}
              />
              <FiChevronRight
                size={25}
                color="#fff"
                onClick={() => goToEnd('section_recently-played-ul')}
              />
            </div>
          </div>
          <ul className="items" id="section_recently-played-ul">
            {resources.recentlyPlayed?.map((t) => (
              <li key={t.track.id}>
                <Track track={t.track} />
              </li>
            ))}
          </ul>
        </Section>
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
