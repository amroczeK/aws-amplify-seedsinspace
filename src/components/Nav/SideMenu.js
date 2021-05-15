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
import AdminMenu from "./AdminMenu";
import UserMenu from "./UserMenu";
import PublicMenu from "./PublicMenu";

// Context
import { UserContext } from "../context/User";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const SideMenu = () => {
  const [open, setOpen] = useState(false);

  const { userData, loggedIn } = useContext(UserContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("hello");
    setOpen(false);
  };

  // NOTE: WILL NEED TO CHANGE WHEN WE INCORPORATE AUTH FLOWS
  const Menus = () => {
    if (loggedIn) {
      const userMenus = {
        admin: <AdminMenu callback={handleClose} />,
        default: <UserMenu callback={handleClose} />,
      };

      return userMenus[userData.role] || userMenus["default"];
    } else {
      return <PublicMenu callback={handleClose} />;
    }
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
          <Menus />
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
  padding: 1em 0em 0em 2em;
  background: ${({ theme }) => theme.primaryBackground};
`;

const StyledMenuContent = styled.div`
  padding: 1em 0em 0em 1em;
  height: 100%;
  background: ${({ theme }) => theme.primaryBackground};
`;

export default SideMenu;
