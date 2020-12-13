import styled from 'styled-components';

export const Container = styled.div`
  background: #4a405f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    position: relative;

    img {
      width: 108px;
      height: 108px;
      border-radius: 54px;
      margin-bottom: 16px;
    }

    button.avatar {
      background: #3b1d6d;
      border: 0;
      width: 28px;
      height: 28px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;

      bottom: 8px;
      right: 0;
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
