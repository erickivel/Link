import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  button {
    height: 56px;
    width: 100%;
    border: 0;
    border-radius: 10px;
    background: #3b1d6d;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    color: #ede8f4;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#3b1d6d')};
    }
  }
`;
