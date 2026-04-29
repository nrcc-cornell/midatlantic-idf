import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import HoverPopper from "../hover-popper/hover-popper.component";

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
    backgroundColor: "#3f51b5",
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
      backgroundColor: "#3f51b5",
    },
  },
  label: {
    color: "black !important",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  itemLabel: {
    "& > .MuiFormControlLabel-label": {
      color: "black",
    }
  },
  hoverItemLabel: {
    "& > .MuiFormControlLabel-label": {
      color: "rgb(83,122,238)",
      fontWeight: "bold"
    }
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function RadioBoxes({ label, items, selected, handleChange, gap=0 }) {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      {label && <FormLabel className={classes.label} component="legend">{label}</FormLabel>}
      <RadioGroup value={selected} aria-label={label} onChange={handleChange} style={{ gap: `${gap}px` }}>
        {items.map((item, i) => {
          if ("hoverText" in item) {
            return <HoverPopper key={i} popperText={item.hoverText}><FormControlLabel className={classes.hoverItemLabel} value={item.value} control={<StyledRadio />} label={item.label} /></HoverPopper>;
          } else {
            return <FormControlLabel key={i} className={classes.itemLabel} value={item.value} control={<StyledRadio />} label={item.label} />;
          }
        })}
      </RadioGroup>
    </FormControl>
  );
}

RadioBoxes.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
  selected: PropTypes.string,
  handleChange: PropTypes.func,
  gap: PropTypes.number
};