import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useAws } from "../../context/AWSContext";

const StyledListItemText = styled(ListItemText)`
  color: #fff;
`;

export const SideMenuItems = ({ callback }) => {
  const { cognitoUser, signOut } = useAws();

  return (
    <List component="nav">
      {cognitoUser && (
        <>
          <ListItem button component={Link} onClick={callback} to="/profile">
            <StyledListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} onClick={callback} to="/export">
            <StyledListItemText primary="Export Data" />
          </ListItem>
        </>
      )}
      <ListItem button component={Link} onClick={callback} to="/">
        <StyledListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} onClick={callback} to="/dashboard">
        <StyledListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} onClick={callback} to="/resources">
        <StyledListItemText primary="Resources" />
      </ListItem>
      <ListItem button component={Link} onClick={callback} to="/schools">
        <StyledListItemText primary="Participating Schools" />
      </ListItem>
      <ListItem button component={Link} onClick={callback} to="/faq">
        <StyledListItemText primary="FAQ" />
      </ListItem>
      {cognitoUser ? (
        <ListItem button component={Link} onClick={signOut} to="/signin">
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
