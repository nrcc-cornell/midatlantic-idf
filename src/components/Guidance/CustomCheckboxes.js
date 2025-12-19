import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 0,
    width: 16,
    height: 16,
    boxShadow: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    border: "1px solid rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(57, 155, 216, 0.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
      border: "1px solid rgba(206,217,224,.7)",
    },
  },
  checkedIcon: {
    backgroundColor: "#2592d6ff",
    boxShadow: "none",
    "&:before": {
      // eslint-disable-next-line quotes
      content: '"✔"',
      display: "block",
      position: "relative",
      left: "0px",
      bottom: "3px",
      color: "white",
      fontSize: "15px",
    },
    "input:hover ~ &": {
      backgroundColor: "#2592d6ff",
    },
  },
  label: {
    color: "black !important",
    fontWeight: "bold",
    fontSize: "1.2rem"
  },
  itemLabel: {
    "& > .MuiFormControlLabel-label": {
      color: "black",
    }
  }
});

// Inspired by blueprintjs
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function CustomCheckboxes({ label, items, checked, handleChange }) {
  const classes = useStyles();
  
  return (
    <FormControl component="fieldset">
      {label && <FormLabel className={classes.label} component="legend">{label}</FormLabel>}
      <FormGroup>
        {items.map((item, i) => <FormControlLabel key={i} className={classes.itemLabel} value={item.value} control={<StyledCheckbox checked={checked[item.value]} onChange={(e) => handleChange(e, item)} name={item.label} />} label={item.label} />)}
      </FormGroup>
    </FormControl>
  );
}

CustomCheckboxes.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
  checked: PropTypes.object,
  handleChange: PropTypes.func,
};