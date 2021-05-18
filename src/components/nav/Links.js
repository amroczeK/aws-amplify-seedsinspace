import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardBtn, ResourcesBtn, ProfileBtn, ContactBtn, LoginBtn, LogoutBtn } from "./Buttons";
import styled from "styled-components";

const Links = () => {
  const { pathname } = useLocation();
  const loggedIn = false;
  return (
    <Container>
      <LinksContainer>
        <NavLink to="/dashboard">
          <DashboardBtn active={pathname === "/dashboard"} />
        </NavLink>
        <NavLink to="/resources">
          <ResourcesBtn active={pathname === "/resources"} />
        </NavLink>
        <NavLink to="/profile">
          <ProfileBtn active={pathname === "/profile"} />
        </NavLink>
        <NavLink to="/contact">
          <ContactBtn active={pathname === "/contact"} />
        </NavLink>
        {!loggedIn ? (
          <NavLink to="/login">
            <LoginBtn />
          </NavLink>
        ) : (
          <NavLink to="/logout">
            <LogoutBtn />
          </NavLink>
        )}
      </LinksContainer>
    </Container>
  );
};

export default Links;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const LinksContainer = styled.div`
  padding: 1rem;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const NavLink = styled(Link)`
  padding: 1.5rem;
  color: ${({ theme }) => theme.primaryLight};
  text-decoration: none;
`;
