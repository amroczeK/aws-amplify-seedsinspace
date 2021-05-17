import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import SideMenu from "./SideMenu";
import TopMenu from "./TopMenu";

const Header = () => {
  return (
    <Container>
      <SideMenu />
      <StyledLink to="/">
        <h2>Seeds in space</h2>
      </StyledLink>
      <TopMenu />
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

const StyledLink = styled(Link)`
  justify-content: center;
  align-items: center;
  text-decoration: none !important;
  h2 {
    color: ${({ theme }) => theme.primaryLight};
  }
`;
