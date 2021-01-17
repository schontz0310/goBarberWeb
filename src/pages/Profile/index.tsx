/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-expressions */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getvalidationErros';
import api from '../../services/api';
import { useToast } from '../../hook/toast';
import Loading from '../../components/LoadingAnimation';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hook/auth';

interface ProfileForData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const [done, setDone] = useState<Boolean>(true);
  const [newPassword, setNewPassword] = useState<boolean>(false);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileForData) => {
      try {
        const schemaValidation = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when(
            'old_password',
            (checkOldPassword: Yup.StringSchema<string | undefined>) => {
              if (checkOldPassword)
                return Yup.string().required('Campo obrigatório');
              return Yup.string();
            },
          ),
          password_confirmation: Yup.string().when(
            'old_password',
            (checkOldPassword: Yup.StringSchema<string | undefined>) => {
              if (checkOldPassword)
                return Yup.string()
                  .required('Campo obrigatório')
                  .oneOf([Yup.ref('password')], 'Senhas diferentes');
              return Yup.string();
            },
          ),
        });

        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil Atualizado',
          description: 'Voce realizou as alterações em seu perfil com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro ao atualizar',
          description:
            'Infelizmente tivemos problemas ao atulizar suas informções',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDone(false);
      const data = new FormData();
      if (event.target.files) {
        data.append('avatar', event.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar',
            description: 'Você atualizou sua imagem de avatar com sucesso!',
          });
        });
        setDone(true);
      }
    },
    [addToast, updateUser, setDone],
  );

  const handleLoadDetail = useCallback(() => {
    setDone(false);
  }, []);

  const checkNewPassword = useCallback(() => {
    const value = formRef.current?.getFieldValue('old_password');
    value.length > 0 ? setNewPassword(true) : setNewPassword(false);
  }, []);

  useEffect(() => {
    const value = formRef.current?.getFieldValue('old_password');
    value.length > 0 ? setNewPassword(true) : setNewPassword(false);
  }, []);
  return (
    <>
      <Container>
        <header>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </header>
        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              {!done ? (
                <Loading height={186} width={186} />
              ) : (
                <img src={user.avatar_url} alt={user.name} loading="eager" />
              )}

              <label htmlFor="avatar">
                <FiCamera />
                <input
                  type="file"
                  id="avatar"
                  onClick={handleLoadDetail}
                  onChange={handleAvatarChange}
                />
              </label>
            </AvatarInput>
            <h1>Meu Perfil</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              disabled
              style={{ color: '#666360' }}
            />
            <Input
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
              onChange={checkNewPassword}
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              disabled={!newPassword}
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              disabled={!newPassword}
              placeholder="Confirmar nova senha"
            />
            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
