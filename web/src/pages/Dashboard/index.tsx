import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FiMessageSquare,
  FiUsers,
  FiSettings,
  FiSend,
  FiPower,
} from 'react-icons/fi';
import { format, isToday, parseISO } from 'date-fns';

import { FormHandles } from '@unform/core';
import {
  useSendMessageMutation,
  useListMessagesOfSpecificContactQuery,
  useNewMessageSubscription,
} from '../../gql/generated/graphql';
import Input from '../../components/Input';
import Messages from '../../components/Messages';
import Contacts from '../../components/Contacts';
import AccountInfo from '../../components/AccountInfo';
import NoSelectedMessagesImg from '../../assets/noSelectedMessages.svg';
import LeftTail from '../../assets/left-tail.svg';
import RightTail from '../../assets/right-tail.svg';

import avatarsArray from '../../utils/avatarsArray';

import {
  Container,
  Content,
  UserHeader,
  Navigation,
  NoConverseSelected,
  AnimationContainer,
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
  avatar?: number | undefined | null;
  about?: string | undefined | null;
}

interface MessageSent {
  id?: string;
  to: string;
  from: string;
  text: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, appLogout } = useAppState();

  const formRef = useRef<FormHandles>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const [toChat, setToChat] = useState<User>({} as User);
  const [messages, setMessages] = useState<MessageSent[]>([] as MessageSent[]);
  const [currentNav, setCurrentNav] = useState<
    'messages' | 'contacts' | 'accountInfo'
  >('messages');

  const changeNav = useCallback(
    (newNav: 'messages' | 'contacts' | 'accountInfo') => {
      setCurrentNav(newNav);
    },
    [],
  );

  const {
    data: messagesOfSpecificContact,
    refetch,
  } = useListMessagesOfSpecificContactQuery({
    variables: { contact_id: toChat.id || '' },
  });

  const { data: newMessage } = useNewMessageSubscription({
    variables: { topic: user.id },
  });

  useEffect(() => {
    setMessages(messagesOfSpecificContact?.listMessagesOfSpecificContact || []);
  }, [messagesOfSpecificContact]);

  useEffect(() => {
    if (toChat.id !== undefined) {
      refetch();
    }
  }, [toChat, refetch]);

  useEffect(() => {
    if (
      newMessage?.newMessage !== undefined &&
      newMessage.newMessage.from === toChat.id
    ) {
      setMessages([...messages, newMessage.newMessage]);
    }
  }, [newMessage]);

  const [sendMessage] = useSendMessageMutation();

  const scrollToBottom = useCallback(() => {
    const scrollHeight = chatRef.current?.scrollHeight;
    chatRef.current?.scrollTo({ top: scrollHeight });
  }, []);

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

        const scrollHeight = chatRef.current?.scrollHeight;
        chatRef.current?.scrollTo({ top: scrollHeight });

        reset();
      } catch (error) {
        toast.error('Ocorreu um erro ao enviar a mensagem');
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
              src={
                user.avatar === undefined ||
                user.avatar === null ||
                user.avatar === 0
                  ? avatarsArray[0]
                  : avatarsArray[user.avatar]
              }
              alt="Avatar"
            />
            <strong>{user.username}</strong>
          </div>
          <button type="button" onClick={appLogout}>
            <FiPower color="#1E0547" size={24} />
          </button>
        </UserHeader>
        {currentNav === 'messages' && (
          <Messages setToChat={changeToChat} toChatId={toChat.id} />
        )}
        {currentNav === 'contacts' && (
          <Contacts setToChat={changeToChat} setNav={changeNav} />
        )}
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
        {toChat.username === undefined ? (
          <NoConverseSelected>
            <h1>Clique em uma conversa para exibi-la</h1>
            <img src={NoSelectedMessagesImg} alt="Caixa-de-correio" />
          </NoConverseSelected>
        ) : (
          <AnimationContainer>
            <ContactHeader>
              <img
                src={
                  toChat.avatar === undefined ||
                  toChat.avatar === null ||
                  toChat.avatar === 0
                    ? avatarsArray[0]
                    : avatarsArray[toChat.avatar]
                }
                alt="Avatar"
              />
              <strong>{toChat.username}</strong>
            </ContactHeader>
            <Chat ref={chatRef} onLoad={scrollToBottom}>
              {messages.map(message => (
                <Message
                  key={message.id}
                  messageType={message.from === user.id ? 'out' : 'in'}
                >
                  <div>
                    <img
                      src={message.from === user.id ? RightTail : LeftTail}
                      alt="tail"
                    />
                    <span>{message.text}</span>
                    <span className="time">
                      {isToday(parseISO(message.created_at))
                        ? format(parseISO(message.created_at), "kk':'mm")
                        : format(
                            parseISO(message.created_at),
                            "dd'/'MM'/'uuuu' - 'kk':'mm",
                          )}
                    </span>
                  </div>
                </Message>
              ))}
            </Chat>
            <InputMessage>
              <Form ref={formRef} onSubmit={handleSendMessage}>
                <Input
                  name="text"
                  type="text"
                  placeholder="Escreva uma mensagem"
                />
                <button type="submit">
                  <FiSend size={24} color="#342B44" />
                </button>
              </Form>
            </InputMessage>
          </AnimationContainer>
        )}
      </Content>
    </Container>
  );
};

export default Dashboard;
