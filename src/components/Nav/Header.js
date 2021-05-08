import React from "react";
import { Link } from "react-router-dom";
import Links from "./Links";
import { Rocket } from "@styled-icons/ionicons-sharp/Rocket";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      {/* <Logo> */}
      <NavLink to="/">
        {/* <RocketIcon /> */}
        <h1>Seeds in space</h1>
      </NavLink>
      {/* </Logo> */}
      {/* <Links /> */}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5em;
  background: ${({ theme }) => theme.primaryBackground};
`;

const Logo = styled.div`
  justify-content: center;
  align-items: center;
  padding: 1rem;
  h1 {
    padding-left: 1rem;
    color: ${({ theme }) => theme.primaryLight};
  }
`;

const NavLink = styled(Link)`
  flex: 1 0;
  justify-content: center;
  align-items: center;
  text-decoration: none !important;
  h1 {
    color: ${({ theme }) => theme.primaryLight};
  }
`;

const RocketIcon = styled(Rocket)`
  color: white;
  height: 5rem;
  width: 5rem;
`;
