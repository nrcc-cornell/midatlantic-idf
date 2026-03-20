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
    justifyContent: "flex-end",
    width: "45%",
  },
  bodyContainer: {
    display: "flex",
    gap: "12px",
    minHeight: "450px"
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
  },
  imgStackContainer: {
    marginTop: "40px",
    position: "relative",
    width: "55%",
    "& > img": {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: "100%"
    }
  }
}));

const resourceLevelOptions = [
  { value: "low", label: "Low", hoverText: "Term definition"},
  { value: "moderateHigh", label: "Moderate/High", hoverText: "Term definition"}
];

export default function ResourceLevel({ options, handleOptionsChange }) {
  const classes = useStyles();

  const getFlowchartImageStack = (riskOrientation, resourceLevel) => {
    const stack = [];

    // Add the base flowchart no matter what
    stack.push(<img key="base-flowchart" src={process.env.PUBLIC_URL + "/assets/flowcharts/cf_flowchart.jpg"} alt="Flowchart that shows how selected options alter the recommended change factor scenario and percentiles" />);
    
    if (riskOrientation) {
      stack.push(<img key="risk-orientation-overlay" src={process.env.PUBLIC_URL + `/assets/flowcharts/cf_risk_orientation_${riskOrientation}.png`} alt="Overlay highlighting risk orientation selection" />);

      if (resourceLevel) {
        stack.push(<img key="resource-level-overlay" src={process.env.PUBLIC_URL + `/assets/flowcharts/cf_risk_orientation_${riskOrientation}_resource_level_${resourceLevel}.png`} alt="Overlay highlighting resource level selection and resulting recommendations for change scenario and percentiles" />);
      }
    }

    return (
      <div className={classes.imgStackContainer}>
        {stack}
      </div>
    );
  };

  return (
    <div className={ classes.mainContainer }>
      <div className={ classes.bodyContainer }>
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

        {getFlowchartImageStack(options.riskOrientation.riskOrientation, options.resourceLevel)}
      </div>

      <p className={ classes.endnote }>Refer to page X-Y of the decision support guide for more details on these choices.</p>
    </div>
  );
}

ResourceLevel.propTypes = {
  options: PropTypes.object,
  handleOptionsChange: PropTypes.func,
};