/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
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

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schemaValidation = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Recuperação de Senha bem sucedida',
          description:
            'Você recebeu um email com as instruções de recuperação de senha',
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
          title: 'Erro na recuperação de senha',
          description: 'Ocorreu um erro ao tentar recuperar sua senha',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <>
      <Container>
        <Content>
          <Animationcontainer>
            <img src={logo} alt="logomarca" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Recuperar Senha</h1>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Button loading={loading} type="submit">
                Recuperar
              </Button>
            </Form>
            <Link to="/">
              <FiLogIn />
              Voltar para Login
            </Link>
          </Animationcontainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default ForgotPassword;
