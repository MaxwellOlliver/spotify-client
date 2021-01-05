import { useEffect, useState } from 'react';
import {
  FiClock,
  FiHome,
  FiPlay,
  FiPlus,
  FiSkipBack,
  FiSkipForward,
  FiStar,
} from 'react-icons/fi';

import { Container } from './styles';
import logo from '../../assets/logo.png';
import Player from '../../components/Player';
import { Spotify } from '../../services/spotifyApi';
import Routes from './routes';
import Controllers from '../../components/Controllers';
import { Link } from 'react-router-dom';

const WrapContainer: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [playlists, setPlaylists] = useState([]);

  const getResources = async () => {
    const { data: user }: any = await Spotify({
      method: 'get',
      url: '/me',
    });

    const { data: playlists }: any = await Spotify({
      method: 'get',
      url: `/users/${user?.id}/playlists`,
    });

    setPlaylists(playlists.items);
    setUser(user);
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <Container>
      <aside>
        <img src={logo} alt="logo-spotify" />
        <Link to="/">
          <FiHome size={18} color="#fff" />
          <span>início</span>
        </Link>
        <Link to="/recently-played">
          <FiClock size={18} color="#fff" />
          <span>tocadas recentemente</span>
        </Link>
        <a href="http://">
          <FiStar size={18} color="#fff" />
          <span>músicas curtidas</span>
        </a>
        <div>
          <span>playlists</span>
          <FiPlus color="#fff" size={18} />
        </div>
        <ul className="playlists">
          {playlists.map((playlist: any) => (
            <li key={playlist.id}>
              <span>{playlist.name}</span>
            </li>
          ))}
        </ul>
        <Player />
      </aside>
      <div className="right-side">
        <nav>
          <input type="text" className="search" placeholder="Pesquisar..." />
          <div className="profile">
            <img src={user?.images[0]?.url} alt="profile" />
            <span>{user?.display_name}</span>
          </div>
        </nav>
        <div className="content">
          <Controllers />
          <Routes />
        </div>
      </div>
    </Container>
  );
};

export default WrapContainer;
