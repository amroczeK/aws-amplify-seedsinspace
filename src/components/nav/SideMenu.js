import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import styled from "styled-components";
import { Menu } from "@styled-icons/heroicons-solid/Menu";
import { Close } from "@styled-icons/evaicons-solid/Close";

import { SideMenuItems } from "./SideMenuItems";
import Typography from "@material-ui/core/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const StyledMenuIcon = styled(Menu)`
  color: #fff;
  width: 1.5em;
  height: 1.5em;
`;

const StyledCloseIcon = styled(Close)`
  color: #fff;
  width: 1.5em;
  height: 1.5em;
`;

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

const SideMenu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton style={{ marginLeft: "0.25em" }} onClick={handleOpen}>
        <StyledMenuIcon />
      </IconButton>
      <StyledTypography component={Link} to="/" variant="h5">
        Seeds in space
      </StyledTypography>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <StyledAppBar>
          <StyledTypography variant="h5">Seeds in Space</StyledTypography>
          <IconButton style={{ marginRight: "0.5em" }} onClick={handleClose}>
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

const StyledTypography = styled(Typography)`
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  margin-left: 0.5em;
  line-height: 2.8;
`;
