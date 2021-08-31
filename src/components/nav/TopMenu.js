import styled from "styled-components";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAws } from "../../context/AWSContext";

const TopMenu = () => {
  const { signOut, cognitoUser } = useAws();

  return (
    <>
      <StyledTypography component={Link} to="/" variant="h5">
        Seeds in space
      </StyledTypography>
      <NavButton component={Link} to="/">
        About SIS
      </NavButton>
      {cognitoUser && <NavButton component={Link} to="/dashboard">My Seeds</NavButton>}
      {/* {!cognitoUser && <NavButton component={Link} to="/all-seeds">All Seeds</NavButton>} */}
      <NavButton component={Link} to="/community">
        Community
      </NavButton>
      <NavButton component={Link} to="/resources">
        Resources
      </NavButton>
      <Expander />
      {cognitoUser ? (
        <>
          <NavButton component={Link} to="/profile">
            Profile
          </NavButton>
          <NavButton component={Link} onClick={signOut} to="/signin">
            Logout
          </NavButton>
        </>
      ) : (
        <NavButton component={Link} to="/signin">
          Login
        </NavButton>
      )}
    </>
  );
};

export default TopMenu;

const StyledTypography = styled(Typography)`
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  margin: 0 1em;
  line-height: 2.8;
`;

const NavButton = styled(Button)`
  font-size: 16px;
  margin-right: 0.5em;
  padding: 0.5em;
  color: #fff;
  text-transform: none;
  &:hover {
    background-color: hsl(149deg 45% 34%);
  }
`;

const Expander = styled.div`
  flex: 1 0;
`;
