import React from 'react';

import { Container } from './styles';
import LoaderImg from '../../assets/audio.svg';

const Loader: React.FC = () => {
  return (
    <Container>
      <img src={LoaderImg} alt="loader" />
    </Container>
  );
};

export default Loader;
