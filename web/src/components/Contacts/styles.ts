import styled from 'styled-components';

export const Container = styled.div`
  grid-area: components;
  background: #4a405f;
  border-right: 1px solid #272333;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(39, 35, 51, 0.5);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const ContactsBox = styled.div`
  margin: 12px 32px;

  div:last-child {
    border: 0;
  }
`;

export const ContactItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #342b44;
  display: flex;
  align-items: center;

  img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 16px;

    strong {
      font-size: 18px;
      font-weight: normal;
    }

    span {
      color: #bcb2c0;
      font-size: 16px;
      margin-top: 6px;
    }
  }
`;
