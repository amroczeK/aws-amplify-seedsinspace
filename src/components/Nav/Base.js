import React from "react";
import styled from "styled-components";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

const Base = () => {
  return (
    <Container>
      <Header />
      <SideMenu />
      <Footer />
    </Container>
  );
};

export default Base;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;
