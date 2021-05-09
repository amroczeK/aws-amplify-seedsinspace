import React from "react";
import Header from "./Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const NavDiv = styled.div`
  padding-right: 15px;
`;

const PublicMenu = () => {
  return (
    <NavDiv>
      <List component="nav">
        <ListItem button divider component={Link} to="/about">
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem button divider component={Link} to="/schools">
          <ListItemText primary="Participating Schools" />
        </ListItem>
        <ListItem button divider component={Link} to="/faq">
          <ListItemText primary="FAQ" />
        </ListItem>
        <ListItem button divider component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </NavDiv>
  );
};

export const PublicNav = () => {
  return (
    <>
      <Header />
      <PublicMenu />
    </>
  );
};
