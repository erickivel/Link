import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Images = styled.div`
  flex: 1;
  position: relative;

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
