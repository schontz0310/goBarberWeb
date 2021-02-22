/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useAuth } from '../../hook/auth';

import getValidationErrors from '../../utils/getvalidationErros';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';

import { Container, Content, Animationcontainer, Background } from './styles';
import logo from '../../assets/logo.svg';
import { useToast } from '../../hook/toast';

interface SignInFormdata {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormdata) => {
      try {
        formRef.current?.setErrors({});
        const schemaValidation = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schemaValidation.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
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
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer Login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <>
      <Container>
        <Content>
          <Animationcontainer>
            <img src={logo} alt="logomarca" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu Logon</h1>
              <Input
                name="email"
                icon={FiMail}
                autoComplete="off"
                placeholder="E-mail"
              />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />
              <Button type="submit">Entrar</Button>
              <Link to="/forgot-password">Esqueci minha senha</Link>
            </Form>
            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
          </Animationcontainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default Signin;
