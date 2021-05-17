import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const TopMenu = ({ callback }) => {
  return (
    <>
      <StyledList component="nav">
        <ListItem button component={Link} onClick={callback} to="/dashboard">
          <StyledListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} onClick={callback} to="/about">
          <StyledListItemText primary="Resources" />
        </ListItem>
        <ListItem button component={Link} onClick={callback} to="/profile">
          <StyledListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} onClick={callback} to="/logout">
          <StyledListItemText primary="Logout" />
        </ListItem>
      </StyledList>
    </>
  );
};

const StyledList = styled(List)`
  display: flex;
  & a:last-child {
    align-self: flex-end;
  }
`;

const StyledListItemText = styled(ListItemText)`
  color: ${({ theme }) => theme.primaryLight};
`;

export default TopMenu;
