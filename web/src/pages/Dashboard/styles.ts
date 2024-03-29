import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

interface NavigationProps {
  currentNav: 'messages' | 'contacts' | 'accountInfo';
}

interface MessageProps {
  messageType: 'in' | 'out';
}

export const Container = styled.div`
  background: #272333;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
`;

export const Content = styled.div`
  height: 93vh;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 448px auto;
  grid-template-rows: 64px auto 64px;
  grid-template-areas:
    'userHeader messages'
    'components messages'
    'navigation messages';

  @media (max-width: 768px) {
    & {
      grid-template-columns: 320px 320px;
    }
  }
`;

export const UserHeader = styled.header`
  grid-area: userHeader;
  background: #635878;
  border-right: 1px solid #272333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px 0 0 0;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    margin-left: 32px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }

    strong {
      margin-left: 16px;
      font-size: 18px;
      font-weight: normal;
    }
  }

  button {
    background: transparent;
    border: 0;
    margin-right: 32px;
  }
`;

export const Navigation = styled.nav<NavigationProps>`
  grid-area: navigation;
  background: #635878;
  border-right: 1px solid #272333;
  border-radius: 0 0 0 10px;
  display: flex;
  justify-content: space-between;

  button:first-child {
    border-radius: 0 0 0 10px;
  }

  button {
    height: 100%;
    flex: 1;
    border: 0;
    background: #635878;

    transition: background-color 0.3s;

    svg {
      transition: stroke 0.4s;
    }

    &:hover {
      background: #342b44;

      svg {
        stroke: #635878;
      }
    }
  }

  button.${props => `${props.currentNav}-nav`} {
    background: #342b44;

    svg {
      stroke: #635878;
    }
  }
`;

export const NoConverseSelected = styled.div`
  grid-area: messages;
  background: #342b44;
  border-radius: 0 10px 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    max-width: 410px;
    text-align: center;
    font-family: 'Poppins';
  }

  img {
    margin-top: 40px;
    width: 188px;
  }
`;

const appear = keyframes`
from{
  opacity: 0;
  transform: scale(1.5);
} to{
  opacity: 1;
  transform: translateX(1);
}
`;

export const AnimationContainer = styled.div`
  animation: ${appear} 0.3s;
  height: 93vh;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  grid-area: messages;
  display: grid;
  grid-template-rows: 64px auto 64px;
  grid-template-areas:
    'contactHeader'
    'chat'
    'messageInput';
`;

export const ContactHeader = styled.header`
  grid-area: contactHeader;
  background: #635878;
  border-radius: 0 10px 0 0;
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-left: 32px;
  }

  strong {
    margin-left: 16px;
    font-size: 18px;
    font-weight: normal;
  }
`;

export const Chat = styled.div`
  grid-area: chat;
  background: #342b44;
  padding-left: 9%;
  padding-right: 9%;
  padding-top: 30px;

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

export const Message = styled.div<MessageProps>`
  display: flex;
  flex-direction: column;
  align-items: ${props =>
    props.messageType === 'in' ? 'flex-start' : 'flex-end'};

  div {
    max-width: 75%;
    display: flex;
    flex-direction: column;

    background: ${props =>
    props.messageType === 'in' ? '#635878' : '#1E0547'};
    border-radius: ${props =>
    props.messageType === 'in' ? '0 7px 7px 7px' : '7px 0 7px 7px'};
    margin-bottom: 6px;
    padding: 6px 7px 8px 9px;
    position: relative;

    span {
      word-break: break-word;
      font-size: 14px;
      font-weight: normal;
    }

    span.time {
      align-self: flex-end;
      margin: 4px 0 -2px 10px;
      font-size: 11px;
      color: #bcb2c0;
    }

    svg {
      fill: #1e1e1e;
    }

    img {
      position: absolute;
      top: 0;
      ${props =>
    props.messageType === 'in'
      ? css`
              left: -6px;
            `
      : css`
              right: -6px;
            `}
    }
  }
`;

export const InputMessage = styled.div`
  grid-area: messageInput;
  background: #635878;
  border-radius: 0 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      height: 40px;
      width: 95%;
      margin-left: 16px;
      background: #4a405f;
      border: 1px solid #4a405f;
      border-radius: 20px;
      font-size: 14px;
      color: #ede8f4;
      padding: 12px 24px;

      transition: border-color 0.2s;

      &::placeholder {
        color: #bcb2c0;
        font-size: 14px;
      }

      &:focus {
        border: 1px solid #342b44;
      }
    }

    button {
      background: transparent;
      border: 0;
      margin-right: 16px;

      svg {
        transform: rotate(45deg);
        transition: stroke 0.2s;

        &:hover {
          stroke: ${shade(0.2, '#342B44')};
        }
      }
    }
  }
`;
