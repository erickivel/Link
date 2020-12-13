import React from 'react';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LogoImg from '../../assets/logo.svg';
import RegisterImg from '../../assets/registerImg.svg';

import { Container, AnimationContainer, Content, Images } from './styles';

const Register: React.FC = () => {
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form
            onSubmit={data => {
              console.log(data);
            }}
          >
            <h1>Cadastro</h1>

            <Input name="username" placeholder="Nome" />

            <Input name="password" placeholder="Senha" />

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
