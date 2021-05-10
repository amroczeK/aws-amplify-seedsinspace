import React from "react";
import styled from "styled-components";
import Header from "./nav/Header";
import { Home, Dashboard } from "../pages";
import Footer from "./nav/Footer";

const Base = () => {
  return (
    <Container>
      <Header />
      <Home />
      <Dashboard />
      <Footer />
    </Container>
  );
};

export default Base;

const Container = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
