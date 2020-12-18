import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 672px;

  background-color: #4a405f;
`;

const appearFromLeft = keyframes`
from{
  opacity: 0;
  transform: translateX(-50px);
} to{
  opacity: 1;
  transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  animation: ${appearFromLeft} 1s;

  form {
    width: 100%;
    max-width: 352px;
    text-align: center;

    h1 {
      font-family: 'Poppins';
      color: #ede8f4;
      font-size: 36px;
      font-weight: normal;

      text-align: center;
      margin-bottom: 40px;
    }

    input {
      margin-bottom: 16px;
    }

    textarea {
      margin-bottom: 16px;
    }

    button {
      margin-bottom: 16px;
    }

    a {
      text-decoration: none;
      font-family: 'Roboto';
      font-size: 16px;
      color: #ede8f4;

      &:hover {
        color: ${shade(0.2, '#ede8f4')};
      }
    }
  }
`;

export const Images = styled.div`
  flex: 1;
  position: relative;

  img.logo {
    position: absolute;
    width: 20%;
    top: 8%;
    right: 8%;
  }

  img.hero {
    position: absolute;
    width: 80%;
    bottom: 0%;
    right: 0%;
  }
`;
