/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type Buttonprops = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<Buttonprops> = ({ loading, children, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando' : children}
  </Container>
);
export default Button;
