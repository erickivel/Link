import React from 'react';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import LogoImg from '../../assets/logo.svg';
import LoginImg from '../../assets/loginImg.svg';

import { Container, Images, Content } from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <Images>
        <img className="logo" src={LogoImg} alt="Link" />
        <img className="hero" src={LoginImg} alt="Hero" />
      </Images>
      <Content>
        <Form
          onSubmit={data => {
            console.log(data);
          }}
        >
          <Input name="username" placeholder="Username" />
          <Input name="password" placeholder="Senha" />
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
