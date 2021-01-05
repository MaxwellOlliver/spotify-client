import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.SECONDARY};
  z-index: 9998;

  img {
    width: 30px;
  }
`;
