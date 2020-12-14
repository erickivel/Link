import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { Container, ContactsBox, ContactItem } from './styles';

interface User {
  id: string;
  username: string;
  about: string;
}

const Contacts: React.FC = () => {
  const ALL_USERS = gql`
    query users {
      users {
        id
        username
        about
      }
    }
  `;

  const { data } = useQuery(ALL_USERS);
  console.log(data);

  return (
    <Container>
      <ContactsBox>
        {data.users.map((user: User) => (
          <ContactItem key={user.id}>
            <img
              src="https://avatars2.githubusercontent.com/u/68995946?s=460&u=74f344654452d350d8139574615fbe3e1ef57684&v=4"
              alt=""
            />

            <div>
              <strong>{user.username}</strong>
              <span>{user.about}</span>
            </div>
          </ContactItem>
        ))}
      </ContactsBox>
    </Container>
  );
};

export default Contacts;
