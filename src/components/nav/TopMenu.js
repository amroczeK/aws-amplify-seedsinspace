import styled from "styled-components";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { StyledLink } from "../styled-components/Links";
import { useAws } from "../../context/AWSContext";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const TopMenu = () => {
  const { signOut, cognitoUser } = useAws();

  return (
    <StyledNav>
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
        {cognitoUser ? (
          <Button style={{ marginRight: "0.65em" }} as={Link} onClick={signOut}>
            Logout
          </Button>
        ) : (
          <Button style={{ marginRight: "0.65em" }} component={Link} to="/signin">
            Login
          </Button>
        )}
      </StyledList>
    </StyledNav>
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

const StyledNav = styled.nav`
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
