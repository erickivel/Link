import React from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
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
          <h1>Fazer Login</h1>

          <Input name="username" placeholder="Nome" />

          <Input name="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <Link to="register">Criar conta</Link>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
