import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { IconButton } from "@material-ui/core";
import { Flexbox } from "./Flexbox";

/**
 *
 * @param {String} title
 * @param {Component/div} children
 * @param {Array of Objects} buttons
 */
export default function StyledModal({
  title,
  open,
  onClose,
  children,
  buttons,
  width,
  fullWidth = false,
  style,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth={width ? width : "md"}
      fullWidth={fullWidth}
    >
      <IconButton onClick={onClose} style={{ alignSelf: "flex-end" }}>
        <CloseOutline width="1.5em" />
      </IconButton>
      <DialogTitle id="form-dialog-title">
        <b>{title}</b>
      </DialogTitle>
      <DialogContent style={style}>
        <Flexbox direction="column">{children}</Flexbox>
      </DialogContent>
      {buttons && <DialogActions>{buttons}</DialogActions>}
    </Dialog>
  );
}
