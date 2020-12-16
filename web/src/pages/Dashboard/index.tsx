import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMessageSquare, FiUsers, FiSettings, FiSend } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import {
  useSendMessageMutation,
  useListMessagesOfSpecificContactQuery,
  useNewMessageSubscription,
} from '../../gql/generated/graphql';
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
import { useAppState } from '../../hooks/apollo';

interface SendMessageFormData {
  text: string;
}

interface User {
  id: string;
  username: string;
  avatar?: number | null | undefined;
  about?: string | undefined | null;
}

interface MessageSent {
  id: string;
  to: string;
  from: string;
  text: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAppState();

  const formRef = useRef<FormHandles>(null);

  const [toChat, setToChat] = useState<User>({} as User);
  const [messages, setMessages] = useState<MessageSent[]>([] as MessageSent[]);
  const [currentNav, setCurrentNav] = useState<
    'messages' | 'contacts' | 'accountInfo'
  >('messages');

  const {
    data: messagesOfSpecificContact,
  } = useListMessagesOfSpecificContactQuery({
    variables: { contact_id: toChat.id },
  });

  useEffect(() => {
    setMessages(messagesOfSpecificContact?.listMessagesOfSpecificContact || []);
  }, [toChat, messagesOfSpecificContact?.listMessagesOfSpecificContact]);

  const [sendMessage] = useSendMessageMutation();

  const { data: newMessage } = useNewMessageSubscription({
    variables: { topic: toChat.id },
  });

  console.log(newMessage);

  const handleSendMessage = useCallback(
    async (formData: SendMessageFormData, { reset }) => {
      try {
        const { data: dataMessage } = await sendMessage({
          variables: { text: formData.text, to: toChat.id },
        });

        if (dataMessage === undefined || dataMessage === null) {
          throw new Error('Messages not found');
        }

        setMessages([...messages, dataMessage.sendMessage]);

        reset();
      } catch (error) {
        console.log(error);
      }
    },
    [sendMessage, toChat, messages],
  );

  const changeToChat = useCallback((userTo: User) => {
    setToChat(userTo);
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Content>
        <UserHeader>
          <div>
            <img
              src="https://avatars2.githubusercontent.com/u/68995946?s=460&u=74f344654452d350d8139574615fbe3e1ef57684&v=4"
              alt=""
            />
            <strong>{user.username}</strong>
          </div>
          <img className="logo" src={LogoImg} alt="Link" />
        </UserHeader>
        {currentNav === 'messages' && <Messages setToChat={changeToChat} />}
        {currentNav === 'contacts' && <Contacts setToChat={changeToChat} />}
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
          <strong>{toChat.username}</strong>
        </ContactHeader>
        <Chat>
          <Message messageType="in">
            <div>
              <img src={LeftTail} alt="tail" />
              <span>Hows it Going?</span>
            </div>
          </Message>
          {messages.map(message => (
            <Message key={message.id} messageType="out">
              <div>
                <img src={RightTail} alt="tail" />
                <span>{message.text}</span>
              </div>
            </Message>
          ))}
        </Chat>
        <InputMessage>
          <Form ref={formRef} onSubmit={handleSendMessage}>
            <input name="text" type="text" placeholder="Escreva uma mensagem" />
            <button type="submit">
              <FiSend size={24} color="#342B44" />
            </button>
          </Form>
        </InputMessage>
      </Content>
    </Container>
  );
};

export default Dashboard;
