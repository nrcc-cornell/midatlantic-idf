import React from "react";
import PropTypes from "prop-types";

import CloseIcon from "@material-ui/icons/Close";

import "./close-btn.styles.scss";

export default function CloseBtn({ handleClose, sx = {} }) {
  return <CloseIcon onClick={handleClose} className="close-btn" sx={sx} />;
}

CloseBtn.propTypes = {
  handleClose: PropTypes.func,
  sx: PropTypes.object,
};
