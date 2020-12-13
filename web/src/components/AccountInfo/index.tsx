import { Form } from '@unform/web';
import React from 'react';
import { FiCamera } from 'react-icons/fi';
import Button from '../Button';

import Input from '../Input';

import { Container } from './styles';

const AccountInfo: React.FC = () => {
  return (
    <Container>
      <div>
        <img
          src="https://avatars2.githubusercontent.com/u/68995946?s=460&u=74f344654452d350d8139574615fbe3e1ef57684&v=4"
          alt=""
        />
        <button type="button" className="avatar">
          <FiCamera stroke-width={1.5} color="#EDE8F4" size={18} />
        </button>
      </div>

      <Form onSubmit={e => console.log(e)}>
        <Input type="text" name="username" placeholder="Nome" />

        <Input type="text" name="old-password" placeholder="Senha atual" />

        <Input type="text" name="password" placeholder="Nova senha" />

        <Input textArea name="about" />

        <Button>Salvar Mudanças</Button>
      </Form>
    </Container>
  );
};

export default AccountInfo;
