import React, { useState } from 'react';

import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { BiRepeat, BiShuffle } from 'react-icons/bi';

import be from '../../assets/be.png';
import { Spotify } from '../../services/spotifyApi';

const initialValue = {
  paused: false,
  repeat: 'NOT_REPEAT',
  random: false,
};

const Player: React.FC = () => {
  const [player, setPlayer] = useState(initialValue);

  async function getResources(): Promise<void> {
    const playerInfo = Spotify({
      method: 'get',
    });
  }

  return (
    <div className="player-info">
      <span className="playing-now">Ouvindo agora</span>
      <img src={be} alt="be" />
      <span className="music-title">Life goes on</span>
      <span className="artists">BTS</span>
      <div className="controllers">
        <BiShuffle size={18} color="#fff" className="active-bi" />
        <FiSkipBack size={18} color="#fff" />
        {player.paused ? (
          <FiPause size={22} color="#fff" />
        ) : (
          <FiPlay size={22} color="#fff" />
        )}
        <FiSkipForward size={18} color="#fff" />
        <div className="repeat">
          {player.repeat === 'NOT_REPEAT' ? (
            <BiRepeat size={18} color="#fff" />
          ) : (
            <BiRepeat size={18} color="#fff" className="active-bi" />
          )}
          {player.repeat === 'REPEAT_TRACK' && (
            <div className="repeat-balloon">1</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
