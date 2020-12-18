import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FiCamera } from 'react-icons/fi';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Button';
import Input from '../Input';

import { useAppState } from '../../hooks/apollo';
import { useUpdateUserMutation } from '../../gql/generated/graphql';

import { Container } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface FormData {
  username: string;
  avatar: string;
  about: string;
  old_password: string;
  password: string;
}

const AccountInfo: React.FC = () => {
  const { user, updateUser } = useAppState();
  const formRef = useRef<FormHandles>(null);
  const [updateUserMutation] = useUpdateUserMutation();

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Nome obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string | undefined) => !!val?.length,
            then: Yup.string()
              .required('Campo obrigatório')
              .min(6, 'A Senha deve ter no mínimo 6 dígitos'),
            otherwise: Yup.string(),
          }),
          about: Yup.string().required('Recado obrigatório'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        const { username, about, old_password, password } = formData;

        const formDataParsed = {
          username,
          about,
          avatar: 1,
          ...(old_password
            ? {
                old_password,
                password,
              }
            : {}),
        };

        const { data } = await updateUserMutation({
          variables: formDataParsed,
        });

        if (data?.updateUser === undefined) {
          throw new Error('An error occurred');
        }

        updateUser({ ...data.updateUser, id: user.id });

        toast.success('Usuário atualizado com sucesso');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        toast.error('Senha inválida');
      }
    },
    [updateUser, user.id, updateUserMutation],
  );

  return (
    <>
      <Container>
        <div>
          <img
            src="https://avatars2.githubusercontent.com/u/68995946?s=460&u=74f344654452d350d8139574615fbe3e1ef57684&v=4"
            alt=""
          />
          <button type="button" className="avatar">
            <FiCamera strokeWidth={1.5} color="#EDE8F4" size={24} />
          </button>
        </div>

        <Form
          ref={formRef}
          initialData={{
            username: user.username,
            about: user.about,
          }}
          onSubmit={handleSubmit}
        >
          <Input type="text" name="username" placeholder="Nome" />

          <Input
            type="password"
            name="old_password"
            placeholder="Senha atual"
          />

          <Input type="password" name="password" placeholder="Nova senha" />

          <Input textArea name="about" />

          <Button type="submit">Salvar Mudanças</Button>
        </Form>
      </Container>
    </>
  );
};

export default AccountInfo;
