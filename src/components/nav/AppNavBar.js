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
    <Container>
      {isSmall && <SideMenu />}
      {!isSmall && <TopMenu />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
  height: 70px;
  background-color: ${({ theme }) => theme.primaryBackground};
`;
