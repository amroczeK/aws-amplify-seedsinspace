import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const PublicMenu = () => {
  return (
    <>
      <List component="nav">
        <ListItem button component={Link} to="/about">
          <StyledListItemText primary="About Us" />
        </ListItem>
        <ListItem button component={Link} to="/schools">
          <StyledListItemText primary="Participating Schools" />
        </ListItem>
        <ListItem button component={Link} to="/faq">
          <StyledListItemText primary="FAQ" />
        </ListItem>
        <ListItem button component={Link} to="/signin">
          <StyledListItemText primary="Login" />
        </ListItem>
      </List>
    </>
  );
};

const StyledListItemText = styled(ListItemText)`
  color: ${({ theme }) => theme.primaryLight};
`;

export default PublicMenu;