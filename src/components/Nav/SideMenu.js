import React, { useState, useContext } from "react";

// Material UI
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";

// Styled Components
import styled from "styled-components";
import { Menu } from "@styled-icons/heroicons-solid/Menu";
import { Close } from "@styled-icons/evaicons-solid/Close";

// Custom Components
import { StyledTypography } from "../styled-components/Typography";
import UserMenu from "./UserMenu";
import PublicMenu from "./PublicMenu";

// Context
import { UserContext } from "../context/User";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const SideMenu = () => {
  const [open, setOpen] = useState(false);

  const { loggedIn } = useContext(UserContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <StyledMenuIcon />
      </IconButton>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <StyledAppBar>
          <StyledTypography variant="h5">Seeds in Space</StyledTypography>
          <IconButton onClick={handleClose}>
            <StyledCloseIcon />
          </IconButton>
        </StyledAppBar>
        <StyledMenuContent>
          {loggedIn ? <UserMenu /> : <PublicMenu />}
        </StyledMenuContent>
      </Dialog>
    </>
  );
};

const StyledMenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.primaryLight};
  width: 1.5em;
  height: 1.5em;
`;

const StyledCloseIcon = styled(Close)`
  color: ${({ theme }) => theme.primaryLight};
  width: 1.5em;
  height: 1.5em;
`;

const StyledAppBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  background: ${({ theme }) => theme.primaryBackground};
`;

const StyledMenuContent = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.primaryBackground};
`;

export default SideMenu;
