import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAws } from "../../context/AWSContext";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const TopMenu = () => {
  const { signOut, cognitoUser } = useAws();

  return (
    <>
      <StyledTypography component={Link} to="/" variant="h5">
        Seeds in space
      </StyledTypography>
      <NavButton component={Link} to="/">
        Home
      </NavButton>
      {cognitoUser && (
        <NavButton component={Link} to="/my-seeds">
          My Seeds
        </NavButton>
      )}
      <NavButton component={Link} to="/all-seeds">
        All Seeds
      </NavButton>
      <NavButton component={Link} to="/resources">
        Resources
      </NavButton>
      {cognitoUser && (
        <NavButton component={Link} to="/profile">
          Profile
        </NavButton>
      )}
      <NavButton component={Link} to="/schools">
        Schools
      </NavButton>
      <NavButton component={Link} to="/faq">
        FAQ
      </NavButton>
      <Expander />
      {cognitoUser ? (
        <NavButton component={Link} onClick={signOut} to="/signin">
          Logout
        </NavButton>
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
  width: 100px;
  text-transform: none;
  &:hover {
    background-color: hsl(149deg 45% 34%);
  }
`;

const Expander = styled.div`
  flex: 1 0;
`;
