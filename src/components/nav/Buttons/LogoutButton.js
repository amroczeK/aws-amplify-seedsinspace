import React from "react";
import { Auth } from "aws-amplify";
import { LogOut } from "@styled-icons/boxicons-regular/LogOut";
import styled from "styled-components";

const LogoutButton = () => {
  const logout = async () => {
    try {
      console.log('here')
      await Auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <LogoutBtn onClick={logout} />
      <h1>LOGOUT</h1>
    </Container>
  );
};

export default LogoutButton;

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

const LogoutBtn = styled(LogOut)`
  width: 2.5rem;
  height: 2.5rem;
  color: white;
  cursor: pointer;
`;
