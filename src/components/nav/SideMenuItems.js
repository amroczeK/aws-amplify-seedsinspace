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
      <ListItem button component={Link} onClick={callback} to="/dashboard">
        <StyledListItemText>{cognitoUser ? "My Seeds" : "All Seeds"}</StyledListItemText>
      </ListItem>
      <ListItem button component={Link} onClick={callback} to="/resources">
        <StyledListItemText>Resources</StyledListItemText>
      </ListItem>
      <ListItem button component={Link} onClick={callback} to="/schools">
        <StyledListItemText>Community</StyledListItemText>
      </ListItem>
      <ListItem button component={Link} onClick={callback} to="/about">
        <StyledListItemText>About SIS</StyledListItemText>
      </ListItem>
      {cognitoUser ? (
        <>
          <ListItem button component={Link} onClick={callback} to="/profile">
            <StyledListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} onClick={signOut} to="/signin">
            <StyledListItemText primary="Log Out" />
          </ListItem>
        </>
      ) : (
        <ListItem button component={Link} onClick={callback} to="/signin">
          <StyledListItemText primary="Sign In" />
        </ListItem>
      )}
    </List>
  );
};
