import styled from 'styled-components';

export const Container = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  padding-left: 30px;

  li {
    display: flex;
    width: calc(100% / 5 - 15px);
    min-width: calc(100% / 5 - 15px);
    margin-right: 15px;
  }
`;
