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

const timePeriodOptions = [
  { value: "2020-2070", label: <span><b>2020-2070 (Mid-Century)</b> – Select for policy, plans, or infrastructure intended to last less than 30 years</span>},
  { value: "2050-2100", label: <span><b>2050-2100 (Late-Century)</b> – Select for policy, plans or infrastructure expected to last more than 30 years, accounting for long-term exposure and longer-term changes in precipitation patterns</span>},
];

export default function TimePeriod({ options, handleOptionsChange }) {
  const classes = useStyles();

  return (
    <div className={ classes.mainContainer }>
      <div className={ classes.selectorsContainer }>
        <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
          <p className={ classes.selectText }>Select the future time period for your change factor:</p>
      
          <div className={ classes.radioContainer }>
            <RadioBoxes
              gap={12}
              items={timePeriodOptions}
              selected={options["timePeriod"]}
              handleChange={(e) => handleOptionsChange("timePeriod", e.target.value)}
            />
          </div>
        </div>
      </div>

      <p className={ classes.endnote }>Refer to page X-Y of the decision support guide for more details on these choices.</p>
    </div>
  );
}

TimePeriod.propTypes = {
  options: PropTypes.object,
  handleOptionsChange: PropTypes.func,
};