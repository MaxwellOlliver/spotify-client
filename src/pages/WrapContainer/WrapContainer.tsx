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
import { useDispatch, useSelector } from 'react-redux';
import { PlaylistAction } from '../../store/modules/playlist/actions';

const WrapContainer: React.FC<{ history: any }> = ({ history }) => {
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch();
  const playlists: any = useSelector((state: any) => state.playlists.items);

  const getResources = async () => {
    const { data: user }: any = await Spotify({
      method: 'get',
      url: '/me',
    });

    const { data: playlists }: any = await Spotify({
      method: 'get',
      url: `/users/${user?.id}/playlists`,
    });

    dispatch({
      type: PlaylistAction.ADD_EXISTENTS_PLAYLISTS,
      payload: { items: playlists.items },
    });
    setUser(user);
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <Container>
      <aside>
        <img src={logo} alt="logo-spotify" />
        <Link
          to="/"
          className={history.location.pathname === '/' ? 'focused' : ''}
        >
          <FiHome size={18} color="#fff" />
          <span>início</span>
        </Link>
        <Link
          to="/recently-played"
          className={
            history.location.pathname === '/recently-played' ? 'focused' : ''
          }
        >
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
