import React from "react";
import styled from "styled-components";

const Header = () => {
  return <Container></Container>;
};

export default Header;

const Container = styled.div`
  display: flex;
  position: relative;
  height: 8rem;
  width: 100%;
  background: ${({ theme }) => theme.primaryBackground};
`;
