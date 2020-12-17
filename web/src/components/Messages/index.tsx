import React, { useState } from 'react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

import {
  useListFirstMessageOfAllYourConversationsQuery,
  useNewMessageSubscription,
} from '../../gql/generated/graphql';

import { Container, Contacts, ContactItem } from './styles';

interface User {
  id: string;
  username: string;
  avatar?: number | null | undefined;
  about?: string | undefined | null;
}

interface MessagesProps {
  setToChat(user: User): void;
}

interface LastMessage {
  user: {
    avatar?: string;
    id: string;
    username: string;
  };
  message: {
    created_at: Date;
    text: string;
  };
}

const Messages: React.FC<MessagesProps> = ({ setToChat }) => {
  const { data } = useListFirstMessageOfAllYourConversationsQuery();

  const [currentUser, setCurrentUser] = useState('');
  const [] = useState<LastMessage[]>([] as LastMessage[]);

  const { data: newMessage } = useNewMessageSubscription({
    variables: { topic: toChat.id },
  });

  return (
    <Container>
      <Contacts>
        {data?.listFirstMessageOfAllYourConversations.map(message => {
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
                src="https://avatars2.githubusercontent.com/u/68995946?s=460&u=74f344654452d350d8139574615fbe3e1ef57684&v=4"
                alt=""
              />

              <div>
                <strong>{message.user.username}</strong>
                <span>
                  {message.message.text.length > 35
                    ? `${message.message.text.slice(0, 31)} ...`
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
