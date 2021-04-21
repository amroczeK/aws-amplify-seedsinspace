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
  top: 8rem;
  margin-bottom: 8rem;
  width: 18rem;
  height: 100%;
  background: ${({ theme }) => theme.secondaryLight};
  transition: all 0.75s ease;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    transition: all 0.75s ease;
    -webkit-transform: translateX(-100%);
  }
`;
