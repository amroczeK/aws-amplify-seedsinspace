import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { StyledLink } from "../styled-components/Links";

const TopMenu = () => {
  return (
    <>
      <StyledLink padding='0 0 4px 2em' color='white' to='/'>
        <h2>Seeds in space</h2>
      </StyledLink>
      <StyledList component='nav'>
        <StyledListItem component={Link} to='/dashboard'>
          <ListItemText primary='Dashboard' />
        </StyledListItem>
        <StyledListItem component={Link} to='/about'>
          <ListItemText primary='Resources' />
        </StyledListItem>
        <StyledListItem component={Link} to='/profile'>
          <ListItemText primary='Profile' />
        </StyledListItem>
        <Expander />
        <StyledListItem style={{ marginRight: '0.65em' }} component={Link} to='/logout'>
          <ListItemText primary='Logout' />
        </StyledListItem>
      </StyledList>
    </>
  );
};

const Expander = styled.div`
  flex: 1 0;
`;

const StyledList = styled(List)`
  display: flex;
  flex: 1 0;
  padding: 0;
`;

const StyledListItem = styled(ListItem)`
  color: ${({ theme }) => theme.primaryLight};
  width: 115px;
  text-align: center;
  &:hover {
    background-color: hsl(149deg 45% 34%);
  }
`;

export default TopMenu;
