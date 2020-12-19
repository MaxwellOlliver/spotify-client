import styled, { keyframes } from 'styled-components';
import theme from '../../theme';

const widthAnimation = keyframes`
  from {
    width: 100px;
    opacity: 0;
  } to {
    width: 120px;
    opacity: 1;
  }
`;

const fade = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 120px;
  height: 50px;
  background-color: ${theme.PRIMARY};
  display: flex;
  border-radius: 8px;

  .volume,
  .devices {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    > svg {
      cursor: pointer;
      &.is-smart {
        stroke: ${theme.GREEN}80;
      }
      &:hover {
        filter: brightness(0.8);
      }
    }
    .volume-container {
      position: absolute;
      top: -100px;
      width: 120px;
      height: 60px;
      background-color: ${theme.PRIMARY};
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 5px;
      overflow: hidden;
      animation: ${widthAnimation} 0.3s ease;
      transform: rotate(-90deg);

      .slider-container {
        width: 90px;
        position: relative;
        margin-bottom: 5px;
        display: flex;
        flex-direction: column;

        span.bar {
          position: absolute;
          z-index: 1;
          left: 0;
          top: 0;
          width: 90px;
          height: 3px;
          border-radius: 5px;
          background-color: #ffffff81;
          overflow: hidden;

          .fill {
            display: block;
            width: 0%;
            height: 90px;
            background-color: #fff;
          }
        }

        input {
          position: relative;
          width: calc(90px + 13px);
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

    .devices-container {
      padding: 25px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: ${theme.PRIMARY};

      position: absolute;
      bottom: 60px;
      right: 0px;
      border-radius: 8px;
      animation: ${fade} 0.3s ease;
      overflow: hidden;

      > img {
        width: 250px;
      }

      ul.devices {
        width: 100%;
        max-height: 120px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          align-items: center;
          width: 100%;
          height: 55px;
          min-height: 55px;
          padding-left: 20px;
          cursor: pointer;
          background-color: ${theme.PRIMARY};
          border-radius: 25px;
          margin-bottom: 5px;
          transition: all 0.3s;

          &:hover {
            filter: brightness(0.9);
          }

          svg {
            margin-right: 10px;
          }

          .info {
            h3 {
              font-size: 14px;
              margin-bottom: 3px;
            }

            div {
              display: flex;
              align-items: center;

              svg {
                margin-right: 5px;
              }
              span {
                font-size: 12px;
              }
            }
          }

          &.active {
            svg {
              stroke: ${theme.GREEN};
            }
            svg.fill {
              fill: ${theme.GREEN};
            }

            .info {
              color: ${theme.GREEN};
            }
          }
        }
      }
    }
  }
`;
