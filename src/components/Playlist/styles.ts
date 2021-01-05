import styled from 'styled-components';

export const Container = styled.div<{ hover: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;

  div.img {
    width: 100%;
    height: calc(100% - 110px);
    position: relative;

    .hover {
      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;

      background-color: #00000080;
      border-radius: 4px;

      display: flex;
      align-items: center;
      justify-content: center;

      opacity: ${(props) => (props.hover ? 1 : 0)};
      pointer-events: ${(props) => (props.hover ? 'all' : 'none')};
      transition: opacity 0.3s;

      svg {
        cursor: pointer;
        filter: brightness(0.9);
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  .info {
    max-height: 110px;
    min-height: 110px;
    padding: 10px;

    h3 {
      font-size: 18px;
      margin-bottom: 5px;
      overflow: hidden;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    span {
      font-weight: 300;
      overflow: hidden;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  @media (max-width: 1200px) {
    .info {
      h3 {
        font-size: 16px;
      }

      span {
        font-size: 12px;
      }
    }
  }
  @media (max-width: 1000px) {
    .info {
      padding: 5px;

      h3 {
        font-size: 14px;
      }

      span {
        font-size: 12px;
      }
    }
  }
`;
