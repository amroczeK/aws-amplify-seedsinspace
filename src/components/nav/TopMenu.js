import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { StyledLink } from "../styled-components/Links";
import { UserContext } from "../context/User";
import Typography from "@material-ui/core/Typography";

const TopMenu = () => {
  const { signOut } = useContext(UserContext);

  const signOutHandler = async () => {
    try {
      await signOut();
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StyledLink padding="0 0 4px 2em" color="white" to="/">
        <StyledTypography variant="h5">Seeds in space</StyledTypography>
      </StyledLink>
      <StyledList component="nav">
        <StyledListItem component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </StyledListItem>
        <StyledListItem component={Link} to="/tables">
          <ListItemText primary="Tables" />
        </StyledListItem>
        <StyledListItem component={Link} to="/about">
          <ListItemText primary="Resources" />
        </StyledListItem>
        <StyledListItem component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </StyledListItem>
        <Expander />
        <StyledListItem style={{ marginRight: "0.65em" }} component={Link} to="/logout">
          <ListItemText onClick={signOutHandler} primary="Logout" />
        </StyledListItem>
      </StyledList>
    </>
  );
};

export default TopMenu;

const Expander = styled.div`
  flex: 1 0;
`;

const StyledList = styled(List)`
  display: flex;
  flex: 1 0;
  padding: 0;
`;

const StyledListItem = styled(ListItem)`
  color: #fff;
  width: 115px;
  text-align: center;
  &:hover {
    background-color: hsl(149deg 45% 34%);
  }
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
`;
