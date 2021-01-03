import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.SECONDARY};
  display: flex;

  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 16%;
    min-width: 250px;
    height: 100%;
    padding: 15px;
    background-color: ${theme.PRIMARY};

    > img {
      width: 100px;
      margin-bottom: 15%;
    }

    a {
      text-decoration: none;
      width: 100%;
      height: 45px;
      min-height: 45px;
      display: flex;
      padding: 0 20px;
      align-items: center;
      border-radius: 25px;
      color: #fff;
      transition: all 0.3s;
      margin-bottom: 10px;
      background-color: ${theme.PRIMARY};

      svg {
        margin-right: 10px;
      }

      &:hover {
        filter: brightness(0.95);
      }

      &.focused {
        border: 2px solid ${theme.GREEN};
        cursor: default;

        svg {
          stroke: ${theme.GREEN};
        }

        span {
          color: ${theme.GREEN};
        }

        &:hover {
          filter: brightness(1);
        }
      }
    }

    > div:not(.player-info) {
      height: 30px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 10px;

      span {
        text-transform: uppercase;
        color: rgba(100, 100, 100, 30);
        font-size: 12px;
      }

      svg {
        cursor: pointer;
      }
    }

    ul.playlists {
      width: 100%;
      height: 100%;

      overflow: auto;
      margin-bottom: 10px;

      li {
        width: 100%;
        height: 45px;
        min-height: 45px;
        display: flex;
        padding: 0 20px;
        align-items: center;
        border-radius: 25px;
        color: #fff;

        transition: all 0.3s;
        margin-bottom: 10px;
        background-color: ${theme.PRIMARY};
        cursor: pointer;

        span {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        &:hover {
          filter: brightness(0.95);
        }
      }
    }

    div.player-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      span.playing-now {
        color: ${theme.GREEN};
        margin-bottom: 10px;
        font-size: 12px;
      }

      img {
        width: 100px;
        height: 100px;
        border-radius: 4px;
        margin-bottom: 10px;
      }

      span.music-title {
        margin-bottom: 5px;
        text-align: center;
      }

      span.artists {
        font-size: 12px;
        text-align: center;
      }

      .controllers {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 10px;

        .repeat {
          position: relative;
          cursor: pointer;

          .repeat-balloon {
            position: absolute;
            color: #000;
            background-color: ${theme.GREEN};
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0;
            right: 0;
            font-size: 8px;
          }
        }

        svg {
          cursor: pointer;

          &.active-fi {
            stroke: ${theme.GREEN};
          }

          &.active-bi {
            fill: ${theme.GREEN};
          }

          &:hover {
            filter: brightness(0.8);
          }
        }
      }
      .slider-container {
        width: 100%;
        position: relative;
        margin-bottom: 5px;
        display: flex;
        flex-direction: column;

        span.bar {
          position: absolute;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 3px;
          border-radius: 5px;
          background-color: #ffffff81;
          overflow: hidden;

          .fill {
            display: block;
            width: 0%;
            height: 100%;
            background-color: #fff;
          }
        }

        input {
          position: relative;
          width: calc(100% + 13px);
          border-radius: 2px;
          z-index: 2;
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          border-radius: 5px;
          background: transparent;
          cursor: pointer;
          overflow: visible;

          transition: all 0.3s;
        }

        &:hover input#time::-webkit-slider-thumb {
          transform: scale(1);
          opacity: 1;
        }

        input#time::-webkit-slider-thumb {
          transform: scale(0);
          opacity: 0;
        }

        input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background-color: #fff;
          cursor: pointer;

          box-shadow: 0 0 0 0 #ffffff81;
          transition: all 0.3s;

          margin-left: -6.5px;
        }

        input::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 5px #ffffff34;
        }

        input:active::-webkit-slider-thumb {
          box-shadow: 0 0 0 10px #ffffff5e;
        }
      }
    }
  }

  .right-side {
    width: 84%;
    height: 100%;
    display: flex;
    flex-direction: column;

    nav {
      display: flex;
      padding: 15px;
      width: 100%;
      background-color: ${theme.PRIMARY};
      justify-content: space-between;

      input.search {
        height: 35px;
        width: 30%;
        min-width: 300px;
        border-radius: 25px;
        padding: 0 15px;
        color: #333;
        background-color: #fff;
      }

      .profile {
        height: 35px;
        display: flex;
        align-items: center;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }

    .content {
      width: 100%;
      max-width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: auto;
    }
  }
`;
