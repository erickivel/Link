import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

  overflow: hidden;
`;

export const Images = styled.div`
  flex: 1;
  position: relative;

  @media (max-width: 1000px) {
    display: none;
  }

  img.logo {
    position: absolute;
    width: 20%;
    top: 8%;
    left: 8%;
  }

  img.hero {
    position: absolute;
    width: 90%;
    bottom: -25%;
    left: -5%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 672px;

  background-color: #4a405f;

  @media (max-width: 1000px) {
    max-width: 1000px;
  }
`;

const appearFromRight = keyframes`
from{
  opacity: 0;
  transform: translateX(50px);
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

  animation: ${appearFromRight} 1s;
  width: 100%;

  form {
    width: 100%;
    max-width: 352px;
    text-align: center;

    @media (max-width: 430px) {
      max-width: 280px;
    }

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
