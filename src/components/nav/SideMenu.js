import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@styled-icons/heroicons-solid/Menu";
import { Close as CloseIcon } from "@styled-icons/evaicons-solid/Close";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { useAws } from "../../context/AWSContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const SideMenu = () => {
  const { cognitoUser, signOut } = useAws();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton style={{ marginLeft: "0.25em", width: "3em" }} onClick={handleOpen}>
        <MenuIcon style={{ color: "#fff", width: "1.5em", height: "1.5em" }} />
      </IconButton>
      <StyledTypography component={Link} to="/" variant="h5" style={{ marginLeft: "0.5em" }}>
        Seeds in space
      </StyledTypography>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <StyledAppBar>
          <StyledTypography component={Link} to="/" variant="h5" onClick={handleClose}>
            Seeds in space
          </StyledTypography>
          <IconButton style={{ marginRight: "0.5em" }} onClick={handleClose}>
            <CloseIcon style={{ color: "#fff", width: "1.5em", height: "1.5em" }} />
          </IconButton>
        </StyledAppBar>
        <StyledMenuContent>
          <List component="nav">
            <ListItem button component={Link} onClick={handleClose} to="/">
              <StyledListItemText>About SIS</StyledListItemText>
            </ListItem>
            {cognitoUser && (
              <ListItem button component={Link} onClick={handleClose} to="/dashboard">
                <StyledListItemText>My seeds</StyledListItemText>
              </ListItem>
            )}
            {/* {!cognitoUser && (
              <ListItem button component={Link} onClick={handleClose} to="/all-seeds">
                <StyledListItemText>All Seeds</StyledListItemText>
              </ListItem>
            )} */}
            <ListItem button component={Link} onClick={handleClose} to="/community">
              <StyledListItemText>Our community</StyledListItemText>
            </ListItem>
            <ListItem button component={Link} onClick={handleClose} to="/resources">
              <StyledListItemText>Resources</StyledListItemText>
            </ListItem>
            {cognitoUser ? (
              <AuthLinksContainer>
                <ListItem button component={Link} onClick={handleClose} to="/profile">
                  <StyledListItemText primary="Profile" />
                </ListItem>
                <ListItem button component={Link} onClick={signOut} to="/signin">
                  <StyledListItemText primary="Log Out" />
                </ListItem>
              </AuthLinksContainer>
            ) : (
              <AuthLinksContainer>
                <ListItem button component={Link} onClick={handleClose} to="/signin">
                  <StyledListItemText primary="Sign In" />
                </ListItem>
              </AuthLinksContainer>
            )}
          </List>
        </StyledMenuContent>
      </Dialog>
    </>
  );
};

const StyledAppBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1em;
  padding-left: 2em;
  background: ${({ theme }) => theme.palette.primary.dark};
`;

const StyledMenuContent = styled.div`
  padding: 1em 0em 0em 1em;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.dark};
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  line-height: 2.8;
`;

const StyledListItemText = styled(ListItemText)`
  color: #fff;
`;

const AuthLinksContainer = styled.div`
  margin-top: 3rem;
`;

export default SideMenu;
