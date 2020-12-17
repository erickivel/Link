import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LogoImg from '../../assets/logo.svg';
import LoginImg from '../../assets/loginImg.svg';

import { useLoginMutation } from '../../gql/generated/graphql';
import { useAppState } from '../../hooks/apollo';

import { Container, Images, Content, AnimationContainer } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { appLogin } = useAppState();
  const [login] = useLoginMutation();

  const handleSubmit = useCallback(
    async (formData: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Nome obrigatório'),
          password: Yup.string()
            .min(6, 'A senha deve ter no mínimo 6 dígitos')
            .required('Senha obrigatória'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        const { data } = await login({
          variables: {
            username: formData.username,
            password: formData.password,
          },
        });
        if (
          data === undefined ||
          data?.login === undefined ||
          data?.login.token === undefined ||
          data?.login.user === undefined
        ) {
          throw new Error('Invalid credentials');
        }
        appLogin({ token: data.login?.token, user: data.login.user });

        history.push('/dashboard');
      } catch (err) {
        console.error(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        toast.error('Email/senha inválidos');
      }
    },
    [history, login, appLogin],
  );

  return (
    <Container>
      <ToastContainer />
      <Images>
        <img className="logo" src={LogoImg} alt="Link" />
        <img className="hero" src={LoginImg} alt="Hero" />
      </Images>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Fazer Login</h1>

            <Input name="username" placeholder="Nome" />

            <Input type="password" name="password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>

            <Link to="registro">Criar conta</Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Login;
