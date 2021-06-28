import React from "react";
import styled from "styled-components";
import SideMenu from "./SideMenu";
import TopMenu from "./TopMenu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export const AppNavBar = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <NavBar>
      {isSmall && <SideMenu />}
      {!isSmall && <TopMenu />}
    </NavBar>
  );
};

const NavBar = styled.nav`
  display: flex;
  height: 70px;
  background-color: ${({ theme }) => theme.palette.primary.dark};
`;
