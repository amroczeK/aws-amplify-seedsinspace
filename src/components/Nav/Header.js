import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import SideMenu from "./SideMenu";

const Header = () => {
  return (
    <Container>
      <SideMenu />
      <NavLink to="/">
        <h2>Seeds in space</h2>
      </NavLink>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;
  gap: 2em;
  background: ${({ theme }) => theme.primaryBackground};
`;

const NavLink = styled(Link)`
  flex: 1 0;
  justify-content: center;
  align-items: center;
  text-decoration: none !important;
  h2 {
    color: ${({ theme }) => theme.primaryLight};
  }
`;
