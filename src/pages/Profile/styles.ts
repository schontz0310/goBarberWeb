import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;
    padding-left: 20vw;

    svg {
      height: 32px;
      width: 32px;
      color: #ffffff;
      transition: color 0.3s, transform 0.3s;
      :hover {
        transform: scale(1.2, 1.2);
        color: #ff9000;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -176px auto 0;
  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0px;
    bottom: 0px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    input {
      display: none;
    }

    svg {
      height: 20px;
      width: 20px;
    }
    :hover {
      background-color: ${shade(0.3, '#ff9000')};
      transform: scale(1.2, 1.2);

      svg {
        color: #ffff;
        transform: scale(1.3, 1.3);
      }
    }
  }
`;
