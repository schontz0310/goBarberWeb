import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
`;

const apperFromLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(-40px);
}
to{
  opacity: 1;
  transform: translateX(0px);
}
`;

export const Animationcontainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  transition: animation 0.2s;
  animation: ${apperFromLeft} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      font-size: 120%;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.3, '#f4ede8')};
      }
    }
  }
  > a {
    color: #ff9000;
    display: block;
    display: flex;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    font-size: 120%;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.3, '#ff9000')};
    }

    svg {
      margin-right: 8px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
