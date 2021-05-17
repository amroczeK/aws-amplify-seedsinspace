import React from "react";
import styled from "styled-components";
import { StyledLink } from "../styled-components/Links";
import SideMenu from "./SideMenu";
import TopMenu from "./TopMenu";

const Header = () => {
  return (
    <Container>
      <SideMenu />
      <StyledLink color="white" to="/">
        <h2>Seeds in space</h2>
      </StyledLink>
      <TopMenu />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
  gap: 2em;
  background-color: ${({ theme }) => theme.primaryBackground};
`;
