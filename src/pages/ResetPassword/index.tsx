/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getvalidationErros';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';

import { Container, Content, Animationcontainer, Background } from './styles';
import logo from '../../assets/logo.svg';
import { useToast } from '../../hook/toast';
import api from '../../services/api';

interface ResetFormFormData {
  password: string;
  password_confirmation: string;
}

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetFormFormData) => {
      try {
        formRef.current?.setErrors({});
        const schemaValidation = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),

          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Senhas diferentes',
          ),
        });
        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
        });
      }
    },
    [addToast, location.search, history],
  );

  return (
    <>
      <Container>
        <Content>
          <Animationcontainer>
            <img src={logo} alt="logomarca" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Resetar de Senha</h1>
              <Input
                autoComplete="off"
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Nova senha"
              />
              <Input
                autoComplete="off"
                name="password_confirmation"
                icon={FiLock}
                type="password"
                placeholder="Confirmação da senha"
              />
              <Button type="submit">Alterar Senha</Button>
            </Form>
          </Animationcontainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default Signin;
