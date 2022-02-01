import React, { useCallback, useRef, useState } from 'react';
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
import ModalAvatar from '../ModalAvatar';

import avatarsArray from '../../utils/avatarsArray';

interface FormData {
  username: string;
  avatar: string;
  about: string;
  old_password: string;
  password: string;
}

const AccountInfo: React.FC = () => {
  const { user, updateUser } = useAppState();
  const [updateUserMutation] = useUpdateUserMutation();
  const formRef = useRef<FormHandles>(null);

  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  const toggleAvatarModal = useCallback(() => {
    setAvatarModalOpen(!avatarModalOpen);
  }, [avatarModalOpen]);

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
          avatar: user.avatar || 0,
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
    [updateUser, user, updateUserMutation],
  );

  return (
    <>
      <ModalAvatar isOpen={avatarModalOpen} setIsOpen={toggleAvatarModal} />
      <Container>
        <div>
          <img
            src={
              user.avatar === undefined ||
                user.avatar === null ||
                user.avatar === 0
                ? avatarsArray[0]
                : avatarsArray[user.avatar]
            }
            alt="Avatar"
          />
          <button type="button" className="avatar" onClick={toggleAvatarModal}>
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
          autoComplete="off"
        >
          <Input type="text" name="username" placeholder="Nome" />

          <Input
            type="password"
            name="old_password"
            placeholder="Senha atual"
            // Prevent autocomplete
            autoComplete="new-password"
          />

          <Input
            type="password"
            name="password"
            placeholder="Nova senha"
            autoComplete="new-password"
          />

          <Input textArea name="about" />

          <Button type="submit">Salvar Mudanças</Button>
        </Form>
      </Container>
    </>
  );
};

export default AccountInfo;
