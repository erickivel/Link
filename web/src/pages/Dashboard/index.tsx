import React, { useState } from 'react';

import { FiMessageSquare, FiUsers, FiSettings, FiSend } from 'react-icons/fi';

import Messages from '../../components/Messages';
import Contacts from '../../components/Contacts';
import AccountInfo from '../../components/AccountInfo';
import LogoImg from '../../assets/logo.svg';
import LeftTail from '../../assets/left-tail.svg';
import RightTail from '../../assets/right-tail.svg';

import {
  Container,
  Content,
  UserHeader,
  Navigation,
  ContactHeader,
  Chat,
  Message,
  InputMessage,
} from './styles';

const Dashboard: React.FC = () => {
  const [currentNav, setCurrentNav] = useState<
    'messages' | 'contacts' | 'accountInfo'
  >('messages');

  return (
    <Container>
      <Content>
        <UserHeader>
          <div>
            <img
              src="https://avatars2.githubusercontent.com/u/68995946?s=460&u=74f344654452d350d8139574615fbe3e1ef57684&v=4"
              alt=""
            />
            <strong>Eric</strong>
          </div>
          <img className="logo" src={LogoImg} alt="Link" />
        </UserHeader>
        {currentNav === 'messages' && <Messages />}
        {currentNav === 'contacts' && <Contacts />}
        {currentNav === 'accountInfo' && <AccountInfo />}
        <Navigation currentNav={currentNav}>
          <button
            type="button"
            className="messages-nav"
            onClick={() => {
              setCurrentNav('messages');
            }}
          >
            <FiMessageSquare size={24} color="#342B44" />
          </button>
          <button
            type="button"
            className="contacts-nav"
            onClick={() => {
              setCurrentNav('contacts');
            }}
          >
            <FiUsers size={24} color="#342B44" />
          </button>
          <button
            type="button"
            className="accountInfo-nav"
            onClick={() => {
              setCurrentNav('accountInfo');
            }}
          >
            <FiSettings size={24} color="#342B44" />
          </button>
        </Navigation>
        <ContactHeader>
          <img
            src="https://avatars2.githubusercontent.com/u/68995946?s=460&u=74f344654452d350d8139574615fbe3e1ef57684&v=4"
            alt=""
          />
          <strong>Your Contact</strong>
        </ContactHeader>
        <Chat>
          <Message messageType="in">
            <div>
              <img src={LeftTail} alt="tail" />
              <span>Hows it Going?</span>
            </div>
          </Message>
          <Message messageType="out">
            <div>
              <img src={RightTail} alt="tail" />
              <span>Hey bro!</span>
            </div>
          </Message>
        </Chat>
        <InputMessage>
          <input type="text" placeholder="Escreva uma mensagem" />
          <button type="submit">
            <FiSend size={24} color="#342B44" />
          </button>
        </InputMessage>
      </Content>
    </Container>
  );
};

export default Dashboard;
