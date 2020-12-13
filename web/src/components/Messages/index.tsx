import React from 'react';

import { Container, Contacts, ContactItem } from './styles';

const Messages: React.FC = () => {
  return (
    <Container>
      <Contacts>
        <ContactItem>
          <img
            src="https://avatars2.githubusercontent.com/u/68995946?s=460&u=74f344654452d350d8139574615fbe3e1ef57684&v=4"
            alt=""
          />

          <div>
            <strong>Jason Philips</strong>
            <span>Hey, how are you?</span>
          </div>
          <span>05/12/2020</span>
        </ContactItem>
      </Contacts>
    </Container>
  );
};

export default Messages;
