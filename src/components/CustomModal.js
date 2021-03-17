import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  return {
    top: '7vh',
    left: '50vw',
    transform: 'translateX(-25vw)',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'fixed',
    width: '50vw',
    height: '80vh',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
    outline: 'none',
  },
}));

export default function CustomModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="custom-modal-title">How to Use</h2>
      <p id="custom-modal-description">
        Under construction.
      </p>
    </div>
  );

  return (
    <div>
      <div className="link" onClick={handleOpen}>How to Use</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}