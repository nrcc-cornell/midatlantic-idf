import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import RadioBoxes from "../RadioBoxes";

const useStyles = makeStyles(() => ({
  mainContainer: {
    padding: "0px 24px"
  },
  selectorsContainer: {
    gap: "30px",
    margin: "30px 0px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "55%",
    justifyContent: "flex-end",
  },
  selector: {
    padding: "6px 12px",
    width: "fit-content",
    border: "1px solid rgb(220,220,220)",
    borderRadius: "5px"
  },
  endnote: {
    fontStyle: "italic",
    textAlign: "center"
  },
  selectText: {
    margin: 0,
    fontWeight: "bold"
  },
  radioContainer: {
    paddingLeft: "40px"
  }
}));

const resourceLevelOptions = [
  { value: "low", label: "Low", hoverText: "Term definition"},
  { value: "moderateHigh", label: "Moderate/High", hoverText: "Term definition"}
];

export default function ResourceLevel({ options, handleOptionsChange }) {
  const classes = useStyles();

  return (
    <div className={ classes.mainContainer }>
      <div className={ classes.selectorsContainer }>
        <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
          <p className={ classes.selectText }>Select your Resource Level:</p>
      
          <div className={ classes.radioContainer }>
            <RadioBoxes
              items={resourceLevelOptions}
              selected={options["resourceLevel"]}
              handleChange={(e) => handleOptionsChange("resourceLevel", e.target.value)}
            />
          </div>
        </div>
      </div>

      <p className={ classes.endnote }>Refer to page X-Y of the decision support guide for more details on these choices.</p>
    </div>
  );
}

ResourceLevel.propTypes = {
  options: PropTypes.object,
  handleOptionsChange: PropTypes.func,
};