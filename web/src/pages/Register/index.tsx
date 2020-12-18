import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LogoImg from '../../assets/logo.svg';
import RegisterImg from '../../assets/registerImg.svg';
import getValidationErrors from '../../utils/getValidationErrors';

import { useRegisterMutation } from '../../gql/generated/graphql';

import { Container, AnimationContainer, Content, Images } from './styles';

interface FormData {
  username: string;
  password: string;
  about: string;
}

const Register: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [register] = useRegisterMutation();

  const handleSubmit = useCallback(
    async (formData: FormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Nome obrigatório'),
          password: Yup.string()
            .min(6, 'A senha deve ter no mínimo 6 dígitos')
            .required('Senha obrigatória'),
          about: Yup.string().required('Recado obrigatório'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        const { data } = await register({
          variables: {
            username: formData.username,
            password: formData.password,
            about: formData.about,
          },
        });

        if (data?.register.id === undefined) {
          throw new Error('An error occurred');
        }

        reset();

        toast.success(
          'Cadastro realizado com sucesso! Clique aqui para ir para a tela de login',
          {
            onClose: () => {
              history.push('/');
            },
          },
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        toast.error('Esse nome de usuário já existe');
      }
    },
    [register, history],
  );

  return (
    <Container>
      <ToastContainer />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro</h1>

            <Input name="username" placeholder="Nome" />

            <Input type="password" name="password" placeholder="Senha" />

            <Input
              textArea
              name="about"
              placeholder="Escreva um recado (aparecerá para ou outro usuários)"
            />

            <Button type="submit">Confirmar cadastro</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Images>
        <img className="logo" src={LogoImg} alt="Link" />
        <img className="hero" src={RegisterImg} alt="Hero" />
      </Images>
    </Container>
  );
};

export default Register;
