import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

interface ContactItemProps {
  currentUser: string;
  contactId: string;
}

const appearFromRight = keyframes`
from{
  opacity: 0;
  transform: translateX(150px);
} to{
  opacity: 1;
  transform: translateX(0);
}
`;

export const Container = styled.div`
  grid-area: components;
  background: #4a405f;
  border-right: 1px solid #272333;

  overflow-y: auto;
  overflow-x: hidden;

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

export const Contacts = styled.div`
  animation: ${appearFromRight} 0.4s;
  margin: 12px 0;

  div:last-child::before {
    border: 0;
  }
`;

export const ContactItem = styled.div<ContactItemProps>`
  padding: 12px 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  background: ${props =>
    props.currentUser === props.contactId ? shade(0.2, '#4a405f') : '#4a405f'};

  transition: background-color 0.1s;

  &::before {
    content: '';
    position: absolute;
    width: 360px;
    bottom: 0;
    border-bottom: 1px solid #342b44;
  }

  &:hover {
    background: ${shade(0.2, '#4a405f')};
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
  }

  div + span {
    margin-top: 6px;
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

  span {
    font-size: 12px;
    align-self: flex-start;
  }
`;
