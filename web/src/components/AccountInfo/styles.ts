import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  grid-area: components;
  background: #4a405f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    position: relative;

    img {
      width: 156px;
      height: 156px;
      border-radius: 78px;
      margin-bottom: 16px;
    }

    button.avatar {
      background: #3b1d6d;
      border: 0;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;

      transition: background-color 0.2s;

      bottom: 18px;
      right: 4px;

      &:hover {
        background-color: ${shade(0.2, '#3b1d6d')};
      }
    }
  }

  form {
    width: 100%;
    max-width: 352px;

    input {
      margin-bottom: 16px;
    }

    textarea {
      margin-bottom: 16px;
    }
  }
`;
