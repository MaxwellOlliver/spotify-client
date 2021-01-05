import styled from 'styled-components';
import theme from '../../theme';

export const FeaturedPlaylist = styled.div`
  width: 100%;
  height: 30%;
  min-height: 30%;

  overflow: hidden;
  position: relative;

  .background {
    width: 100%;
    height: 100%;
    position: relative;
    background-size: cover !important;
    filter: blur(10px);

    .blur {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background-color: #2f3038e0;
    }
  }

  .fp-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    padding: 40px;

    img {
      width: 14%;
      min-width: 180px;
      height: 100%;
      border-radius: 4px;
    }

    .info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-left: 20px;

      h6 {
        text-transform: uppercase;
        color: rgba(100, 100, 100, 30);
        font-size: 12px;
        font-weight: 400;
      }

      h3 {
        font-size: 30px;
        margin-bottom: 15px;
      }

      span {
        font-size: 16px;
        font-weight: 300;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: auto;
        width: 100px;
        height: 30px;
        background-color: ${theme.GREEN};
        border-radius: 25px;
        font-weight: 700;
        font-size: 12px;
      }
    }
  }
`;

export const Sections = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .chevrons {
      display: flex;

      svg {
        cursor: pointer;
      }
    }

    h3 {
      font-size: 25px;
    }
  }

  ul.items {
    width: 100%;
    max-width: 100%;
    display: flex;
    overflow: hidden;
    list-style: none;
    scroll-behavior: smooth;

    li {
      display: flex;
      width: calc(100% / 5 - 15px);
      min-width: calc(100% / 5 - 15px);
      margin-right: 15px;
    }
  }

  /* @media (max-width: 1300px) {
    ul.items {
      li {
        width: calc(100% / 4 - 15px);
        min-width: calc(100% / 4 - 15px);
      }
    }
  }
  @media (max-width: 1000px) {
    ul.items {
      li {
        width: calc(100% / 3 - 15px);
        min-width: calc(100% / 3 - 15px);
      }
    }
  } */
`;
