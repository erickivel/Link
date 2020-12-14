import React, { useCallback } from 'react';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';

import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LogoImg from '../../assets/logo.svg';
import LoginImg from '../../assets/loginImg.svg';

import { Container, Images, Content, AnimationContainer } from './styles';

interface SignInFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async ({ username, password }: SignInFormData) => {
      await signIn({ username, password });

      return history.push('/dashboard');
    },
    [history, signIn],
  );

  return (
    <Container>
      <Images>
        <img className="logo" src={LogoImg} alt="Link" />
        <img className="hero" src={LoginImg} alt="Hero" />
      </Images>
      <Content>
        <AnimationContainer>
          <Form onSubmit={handleSubmit}>
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
