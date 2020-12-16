import {
  FiClock,
  FiHome,
  FiPlay,
  FiPlus,
  FiSkipBack,
  FiSkipForward,
  FiStar,
} from 'react-icons/fi';
import { BiRepeat, BiShuffle } from 'react-icons/bi';

import { Container } from './styles';
import logo from '../../assets/logo.png';
import profile from '../../assets/14199328_601843183330426_5079185537521042695_n.jpg';
import Player from '../../components/Player';

const WrapContainer: React.FC = () => {
  return (
    <Container>
      <aside>
        <img src={logo} alt="logo-spotify" />
        <a href="http://" className="focused">
          <FiHome size={18} color="#fff" />
          <span>início</span>
        </a>
        <a href="http://">
          <FiClock size={18} color="#fff" />
          <span>tocadas recentemente</span>
        </a>
        <a href="http://">
          <FiStar size={18} color="#fff" />
          <span>músicas curtidas</span>
        </a>
        <div>
          <span>playlists</span>
          <FiPlus color="#fff" size={18} />
        </div>
        <ul className="playlists">
          <li>
            <span>Best of K-Pop</span>
          </li>
        </ul>
        <Player />
      </aside>
      <div className="right-side">
        <nav>
          <input type="text" className="search" placeholder="Pesquisar..." />
          <div className="profile">
            <img src={profile} alt="profile" />
            <span>Maxwell Olliver</span>
          </div>
        </nav>
        <div className="content"></div>
      </div>
    </Container>
  );
};

export default WrapContainer;
