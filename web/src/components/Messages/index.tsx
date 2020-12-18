import React, { useEffect, useState } from 'react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

import {
  useListFirstMessageOfAllYourConversationsQuery,
  useNewMessageSubscription,
} from '../../gql/generated/graphql';

import { Container, Contacts, ContactItem } from './styles';
import { useAppState } from '../../hooks/apollo';
import avatarsArray from '../../utils/avatarsArray';

interface User {
  id: string;
  username: string;
  avatar?: number | null | undefined;
  about?: string | undefined | null;
}

interface MessagesProps {
  setToChat(user: User): void;
  toChatId: string;
}

interface LastMessage {
  user: {
    avatar?: number | null | undefined;
    id: string;
    username: string;
  };
  message: {
    created_at: string;
    text: string;
  };
}

const Messages: React.FC<MessagesProps> = ({ setToChat, toChatId }) => {
  const { user } = useAppState();

  const {
    data,
    refetch,
    loading,
  } = useListFirstMessageOfAllYourConversationsQuery();

  const [currentUser, setCurrentUser] = useState(toChatId);
  const [lastMessages, setLastMessages] = useState<LastMessage[]>(() => {
    refetch().then(res => {
      return res.data.listFirstMessageOfAllYourConversations;
    });

    return [] as LastMessage[];
  });

  useEffect(() => {
    if (
      data !== undefined &&
      data.listFirstMessageOfAllYourConversations !== undefined
    ) {
      setLastMessages(data?.listFirstMessageOfAllYourConversations);
    }
  }, [data]);

  const { data: newMessage } = useNewMessageSubscription({
    variables: { topic: user.id },
  });

  useEffect(() => {
    if (newMessage !== undefined) {
      if (
        lastMessages.find(
          lastMessage => lastMessage.user.id === newMessage?.newMessage.to,
        ) === undefined
      ) {
        refetch();
        return;
      }

      setLastMessages(
        lastMessages.map(lastMessage => {
          if (lastMessage.user.id === toChatId) {
            return {
              ...lastMessage,
              message: {
                ...lastMessage.message,
                created_at: newMessage?.newMessage.created_at || '',
                text: newMessage?.newMessage.text || 'Nova Mensagem',
              },
            };
          }

          return lastMessage;
        }),
      );
    }
  }, [newMessage]);

  return (
    <Container>
      <Contacts>
        {loading
          ? 'Carregando'
          : lastMessages.map(message => {
              let dateParsed = '';

              if (isToday(parseISO(message.message.created_at))) {
                dateParsed = format(
                  parseISO(message.message.created_at),
                  "kk':'mm",
                );
              } else if (isYesterday(parseISO(message.message.created_at))) {
                dateParsed = 'Ontem';
              } else {
                dateParsed = format(
                  parseISO(message.message.created_at),
                  "dd'/'MM'/'uuuu",
                );
              }

              return (
                <ContactItem
                  key={message.user.id}
                  contactId={message.user.id}
                  currentUser={currentUser}
                  onClick={() => {
                    setToChat(message.user);
                    setCurrentUser(message.user.id);
                  }}
                >
                  <img
                    src={
                      message.user.avatar === undefined ||
                      message.user.avatar === null ||
                      message.user.avatar === 0
                        ? avatarsArray[0]
                        : avatarsArray[message.user.avatar]
                    }
                    alt="Avatar"
                  />

                  <div>
                    <strong>{message.user.username}</strong>
                    <span>
                      {message.message.text.length > 31
                        ? `${message.message.text.slice(0, 29)} ...`
                        : message.message.text}
                    </span>
                  </div>

                  <span>{dateParsed}</span>
                </ContactItem>
              );
            })}
      </Contacts>
    </Container>
  );
};

export default Messages;
