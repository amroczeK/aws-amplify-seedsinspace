import React from "react";
import { Link } from "react-router-dom";
import Links from "./Links";
import { Rocket } from "@styled-icons/ionicons-sharp/Rocket";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Logo>
        <NavLink to="/">
          <RocketIcon />
          <h1>SEEDS IN SPACE</h1>
        </NavLink>
      </Logo>
      <Links />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  height: 8rem;
  width: 100vw;
  max-width: 100%;
  background: ${({ theme }) => theme.primaryBackground};
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 35rem;
  h1 {
    font-style: italic;
    padding-left: 1rem;
    color: ${({ theme }) => theme.primaryLight};
  }
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RocketIcon = styled(Rocket)`
  color: white;
  height: 5rem;
  width: 5rem;
`;
