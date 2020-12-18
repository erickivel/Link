import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  div.title {
    display: flex;
    justify-content: space-between;

    h2 {
      font-family: 'Poppins';
    }

    button.close {
      margin-top: -16px;
      margin-right: -4px;
      background: transparent;
      border: 0;

      &:hover {
        svg {
          stroke: ${shade(0.7, '#1b053f')};
        }
      }
    }
  }
`;

export const Images = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-template-rows: 150px, 150px;
  grid-column-gap: 12px;
  grid-row-gap: 8px;

  button {
    background: transparent;
    border: 0;

    img {
      width: 150px;
      height: 150px;
      border-radius: 75px;
      border: 5px solid transparent;

      transition: transform 0.3s;
    }

    &:hover {
      img {
        transform: scale(1.1);
        border: 5px solid #ede8f4;
      }
    }
  }
`;
