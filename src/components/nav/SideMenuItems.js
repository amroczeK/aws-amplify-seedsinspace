import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { UserContext } from "../context/User";

const StyledListItemText = styled(ListItemText)`
  color: ${({ theme }) => theme.primaryLight};
`;

export const SideMenuItems = ({ callback }) => {
  const { userData, loggedIn } = useContext(UserContext);

  console.log(userData);

  return (
    <List component="nav">
      {loggedIn && (
        <>
          <ListItem button component={Link} onClick={callback} to="/dashboard">
            <StyledListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} onClick={callback} to="/profile">
            <StyledListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} onClick={callback} to="/export">
            <StyledListItemText primary="Export Data" />
          </ListItem>
        </>
      )}
      <ListItem button component={Link} onClick={callback} to="/about">
        <StyledListItemText primary="About Us" />
      </ListItem>
      <ListItem button component={Link} onClick={callback} to="/schools">
        <StyledListItemText primary="Participating Schools" />
      </ListItem>
      <ListItem button component={Link} onClick={callback} to="/faq">
        <StyledListItemText primary="FAQ" />
      </ListItem>
      {loggedIn ? (
        <ListItem button component={Link} onClick={callback} to="/logout">
          <StyledListItemText primary="Logout" />
        </ListItem>
      ) : (
        <ListItem button component={Link} onClick={callback} to="/signin">
          <StyledListItemText primary="Login" />
        </ListItem>
      )}
    </List>
  );
};
