import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";

const SimpleDialog = props => {
  const {
    handleClose,
    open,
    component: Component,
    componentProps,
    containerProps,
    title,
  } = props;

  return (
    <Dialog
      maxWidth="lg"
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="dialog-title">{title || ""}</DialogTitle>
      {Component && (
        <Container {...containerProps}>
          <Component {...componentProps} />
        </Container>
      )}
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SimpleDialog;

const Container = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "flex-start"};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "stretch")};
`;
