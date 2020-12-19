import React, { useState } from 'react';

import { useUsersQuery } from '../../gql/generated/graphql';
import avatarsArray from '../../utils/avatarsArray';

import { Container, ContactsBox, ContactItem } from './styles';

interface User {
  id: string;
  username: string;
  avatar?: number | null | undefined;
  about?: string | undefined | null;
}

interface ContactsProps {
  setToChat(user: User): void;
  setNav(newNav: 'messages' | 'contacts' | 'accountInfo'): void;
}

const Contacts: React.FC<ContactsProps> = ({ setToChat, setNav }) => {
  const { data: contactsData, loading } = useUsersQuery();

  const [currentUser, setCurrentUser] = useState('');

  return (
    <Container>
      <ContactsBox>
        {contactsData?.users.map(user => {
          const userAboutParsed =
            user.about !== null &&
            user.about !== undefined &&
            user.about.length > 35
              ? `${user.about.slice(0, 31)} ...`
              : user.about;

          return loading ? (
            'Carregando...'
          ) : (
            <ContactItem
              key={user.id}
              contactId={user.id}
              currentUser={currentUser}
              onClick={() => {
                setToChat(user);
                setCurrentUser(user.id);
                setNav('messages');
              }}
            >
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

              <div>
                <strong>{user.username}</strong>
                <span>{userAboutParsed}</span>
              </div>
            </ContactItem>
          );
        })}
      </ContactsBox>
    </Container>
  );
};

export default Contacts;
