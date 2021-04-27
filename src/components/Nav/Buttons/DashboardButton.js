import React from "react";
import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
import styled from "styled-components";

const DashboardButton = () => {
  return (
    <Container>
      <DashboardBtn />
      <h1>DASHBOARD</h1>
    </Container>
  );
};

export default DashboardButton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    padding-top: 0.75rem;
    padding-bottom: 3px;
  }
  &:after {
    content: "";
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.secondaryLight};
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
`;

const DashboardBtn = styled(Dashboard)`
  width: 2.5rem;
  height: 2.5rem;
  color: white;
  cursor: pointer;
`;
