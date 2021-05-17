import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import styled from "styled-components";
import { Menu } from "@styled-icons/heroicons-solid/Menu";
import { Close } from "@styled-icons/evaicons-solid/Close";
import { StyledTypographyLight } from "../styled-components/Typography";
import { StyledLink } from "../styled-components/Links";
import { SideMenuItems } from "./SideMenuItems";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

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
  padding-top: 1em;
  padding-left: 2em;
  background: ${({ theme }) => theme.primaryBackground};
`;

const StyledMenuContent = styled.div`
  padding: 1em 0em 0em 1em;
  height: 100%;
  background: ${({ theme }) => theme.primaryBackground};
`;

const SideMenu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("hello");
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <StyledMenuIcon />
      </IconButton>
      <StyledLink color="white" to="/">
        <h2>Seeds in space</h2>
      </StyledLink>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <StyledAppBar>
          <StyledTypographyLight variant="h5">
            Seeds in Space
          </StyledTypographyLight>
          <IconButton onClick={handleClose}>
            <StyledCloseIcon />
          </IconButton>
        </StyledAppBar>
        <StyledMenuContent>
          <SideMenuItems callback={handleClose} />
        </StyledMenuContent>
      </Dialog>
    </>
  );
};

export default SideMenu;
