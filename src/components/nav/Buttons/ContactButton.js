import React from "react";
import { ContactSupport } from "@styled-icons/material-outlined/ContactSupport";
import styled from "styled-components";

const ContactButton = ({ active }) => {
  console.log(active);
  return (
    <Container>
      <ContactBtn active={active} />
      <h1>CONTACT</h1>
    </Container>
  );
};

export default ContactButton;

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

const ContactBtn = styled(ContactSupport)`
  width: 2.5rem;
  height: 2.5rem;
  color: white;
  cursor: pointer;
`;
