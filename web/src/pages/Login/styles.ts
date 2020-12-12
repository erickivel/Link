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
    width: 784px;
    bottom: -10%;
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
`;
