import React from "react";
import { LogIn } from "@styled-icons/boxicons-regular/LogIn";
import styled from "styled-components";

const LoginButton = () => {
  return (
    <Container>
      <LoginBtn />
      <h1>LOGIN</h1>
    </Container>
  );
};

export default LoginButton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    padding-top: 0.75rem;
    padding-bottom: 3px;
  }
  &:after {
    content: "";
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.secondaryLight};
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
`;

const LoginBtn = styled(LogIn)`
  width: 2.5rem;
  height: 2.5rem;
  color: white;
  cursor: pointer;
  margin-right: 0.5rem;
`;
