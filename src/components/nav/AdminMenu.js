import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const AdminMenu = ({ callback }) => {
  return (
    <>
      <List component="nav">
        <ListItem button component={Link} onClick={callback} to="/schools">
          <StyledListItemText primary="Participating Schools" />
        </ListItem>
        <ListItem button component={Link} onClick={callback} to="/export">
          <StyledListItemText primary="Export Data" />
        </ListItem>
        <ListItem button component={Link} onClick={callback} to="/signin">
          <StyledListItemText primary="Login" />
        </ListItem>
      </List>
    </>
  );
};

const StyledListItemText = styled(ListItemText)`
  color: ${({ theme }) => theme.primaryLight};
`;

export default AdminMenu;
