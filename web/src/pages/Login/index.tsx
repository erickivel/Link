import React from 'react';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LogoImg from '../../assets/logo.svg';
import LoginImg from '../../assets/loginImg.svg';

import { Container, Images, Content, AnimationContainer } from './styles';

const Login: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Images>
        <img className="logo" src={LogoImg} alt="Link" />
        <img className="hero" src={LoginImg} alt="Hero" />
      </Images>
      <Content>
        <AnimationContainer>
          <Form
            onSubmit={data => {
              history.push('/dashboard');
              console.log(data);
            }}
          >
            <h1>Fazer Login</h1>

            <Input name="username" placeholder="Nome" />

            <Input name="password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>

            <Link to="registro">Criar conta</Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Login;
