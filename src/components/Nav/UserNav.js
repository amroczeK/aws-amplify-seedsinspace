import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const NavDiv = styled.div`
  padding-right: 15px;
`;

const UserMenu = () => {
  return (
    <NavDiv>
      <List component="nav">
        <ListItem button divider component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button divider component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button divider component={Link} to="/about">
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem button divider component={Link} to="/schools">
          <ListItemText primary="Participating Schools" />
        </ListItem>
        <ListItem button divider component={Link} to="/???">
          <ListItemText primary="Export Data" />
        </ListItem>
        <ListItem button divider component={Link} to="/faq">
          <ListItemText primary="FAQ" />
        </ListItem>
        <ListItem button divider component={Link} to="/logout">
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </NavDiv>
  );
};

export const UserNav = () => {
  return (
    <>
      <Header />
      <UserMenu />
    </>
  );
};
