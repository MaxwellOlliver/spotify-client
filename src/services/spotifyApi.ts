import Axios from 'axios';
import { token } from '../config/token';

const Spotify = Axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export { Spotify };
