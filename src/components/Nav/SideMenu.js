import React from "react";
import styled from "styled-components";

const SideMenu = () => {
  return <Container></Container>;
};

export default SideMenu;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 18rem;
  height: 100%;
  background: ${({ theme }) => theme.secondaryLight};
`;
