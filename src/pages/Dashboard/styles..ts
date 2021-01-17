import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';
import ArrowRightIcon from '../../assets/ArrowRightIcon.svg';

const selectedBorder = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: -0.2rem;
  }
`;

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;
export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #999591;
    width: 20px;
    height: 20px;
  }
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    margin-right: 16px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    line-height: 28px;
  }

  span {
    color: #f4ede8;
  }

  a {
    text-decoration: none;
    :hover {
      opacity: 0.8;
    }
    strong {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;
export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  span {
    display: flex;
    align-items: center;
  }

  span + span::before {
    content: '';
    width: 2px;
    height: 12px;
    background: #ff9000;
    margin: 0 8px;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 56px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    margin-top: 24px;
    padding: 16px 24px;
    background: #3e3b47;
    display: flex;
    align-items: center;
    border-radius: 0.8rem;
    position: relative;
    z-index: initial;

    &::before {
      position: absolute;
      height: 98%;
      width: 3rem;
      border-radius: 0.8rem;
      z-index: -1;
      content: '';
      animation-name: ${selectedBorder};
      animation-duration: 300ms;
      animation-fill-mode: forwards;
      background: ${shade(0.5, '#ff9000')};
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;
  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  > p {
    color: #999591;
  }
`;
export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }
  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 8px;
      width: 20px;
      height: 20px;
    }
  }

  div {
    flex: 1;
    margin-left: 24px;
    padding: 16px 24px;
    background: #3e3b47;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 10px;

    &:hover::before {
      position: absolute;
      height: 98%;
      width: 3rem;
      border-radius: 0.8rem;
      z-index: -1;
      content: '';
      animation-name: ${selectedBorder};
      animation-duration: 300ms;
      animation-fill-mode: forwards;
      background: ${shade(0.5, '#ff9000')};
    }

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;
export const Calendar = styled.aside`
  .DayPicker {
    border-radius: 0.6rem;
  }

  .DayPicker-wrapper {
    padding: 0.2em;
    background: #3e3b47;
    border-radius: 1rem;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    background: url(${ArrowLeftIcon}) no-repeat center;
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-NavButton--next {
    background: url(${ArrowRightIcon}) no-repeat center;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 4px;
    margin: 0.8rem 0 0 0;
    padding: 4px;
    background-color: #28262e;
    border-radius: 1rem 1rem;
  }

  .DayPicker-Caption {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Weekday {
    color: #666360;
  }

  .DayPicker-Day {
    width: 2.3rem;
    height: 2.3rem;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 0.6rem;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    transition: 300ms;
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: bold;
    color: #ff9000;
  }

  .DayPicker-Day--disabled {
    color: #666360;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 0.6rem;
    color: #232129 !important;
  }
`;
