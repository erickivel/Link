import React, { useState } from 'react';

import { useUsersQuery } from '../../gql/generated/graphql';

import { Container, ContactsBox, ContactItem } from './styles';

interface User {
  id: string;
  username: string;
  avatar?: number | null | undefined;
  about?: string | undefined | null;
}

interface ContactsProps {
  setToChat(user: User): void;
}

const Contacts: React.FC<ContactsProps> = ({ setToChat }) => {
  const { data } = useUsersQuery();
  const [currentUser, setCurrentUser] = useState('');

  return (
    <Container>
      <ContactsBox>
        {data?.users.map(user => {
          const userAboutParsed =
            user.about !== null &&
            user.about !== undefined &&
            user.about.length > 35
              ? `${user.about.slice(0, 31)} ...`
              : user.about;

          return (
            <ContactItem
              key={user.id}
              contactId={user.id}
              currentUser={currentUser}
              onClick={() => {
                setToChat(user);
                setCurrentUser(user.id);
              }}
            >
              <img
                src="https://avatars2.githubusercontent.com/u/68995946?s=460&u=74f344654452d350d8139574615fbe3e1ef57684&v=4"
                alt=""
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
