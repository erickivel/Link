import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  input {
    height: 56px;
    width: 100%;
    padding: 18px 24px;
    border-radius: 10px;

    border: 1px solid #342b44;
    background: #342b44;
    color: #ede8f4;

    transition: border-color 0.2s;

    &::placeholder {
      color: #bcb2c0;
    }

    &:focus {
      border-color: #8f57ee;
    }
  }

  textarea {
    resize: none;

    height: 120px;
    width: 100%;
    padding: 18px 24px;
    border-radius: 10px;

    border: 1px solid #342b44;
    background: #342b44;
    color: #ede8f4;

    transition: border-color 0.2s;

    &::placeholder {
      color: #bcb2c0;
    }

    &:focus {
      border-color: #8f57ee;
    }
  }

  span {
    align-self: flex-start;
    margin: -8px 0 8px 6px;
    color: #d34242;
  }
`;
