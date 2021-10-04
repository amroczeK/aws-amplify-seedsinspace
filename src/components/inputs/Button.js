import React from "react";
import Button from "@material-ui/core/Button";

export default function ContainedButtons({ title, onClickHandler, size = "medium" }) {
  return (
    <Button variant="contained" color="primary" size={size} onClick={onClickHandler}>
      {title}
    </Button>
  );
}
