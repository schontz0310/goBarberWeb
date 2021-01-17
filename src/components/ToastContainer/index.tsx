/* eslint-disable react/prop-types */
import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';
import Toast from './Toast';

import { ToastMessage } from '../../hook/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransictions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0, transform: 'rotateZ(-90deg)' },
      enter: { right: '0%', opacity: 1, transform: 'rotateZ(0deg)' },
      leave: { right: '-120%', opacity: 0, transform: 'rotateZ(90deg)' },
    },
  );

  return (
    <Container>
      {messagesWithTransictions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
