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
  bodyContainer: {
    display: "flex",
    gap: "12px"
  },
  radioContainer: {
    paddingLeft: "40px"
  }
}));

const exposureOptions = [
  { value: "low", label: "Low", hoverText: "Term definition"},
  { value: "moderate", label: "Moderate", hoverText: "Term definition"},
  { value: "high", label: "High", hoverText: "Term definition"},
];

const sensitivityOptions = [
  { value: "low", label: "Low", hoverText: "Term definition"},
  { value: "moderate", label: "Moderate", hoverText: "Term definition"},
  { value: "high", label: "High", hoverText: "Term definition"},
];

const capacityOptions = [
  { value: "low", label: "Low", hoverText: "Term definition"},
  { value: "moderate", label: "Moderate", hoverText: "Term definition"},
  { value: "high", label: "High", hoverText: "Term definition"},
];

const determineRiskOrientation = (exposure, sensitivity, capacity) => {
  let newRiskOrientation = "";
  if (exposure === "low") {
    if (sensitivity === "low") {
      newRiskOrientation = "tolerant";
    } else if (sensitivity === "moderate") {
      if (capacity === "low" || capacity === "moderate") {
        newRiskOrientation = "managing";
      } else if (capacity === "high") {
        newRiskOrientation = "tolerant";
      }
    } else if (sensitivity === "high") {
      newRiskOrientation = "averse";
    }
  } else if (exposure === "moderate") {
    if (sensitivity === "low") {
      if (capacity === "low" || capacity === "moderate") {
        newRiskOrientation = "managing";
      } else if (capacity === "high") {
        newRiskOrientation = "tolerant";
      }
    } else if (sensitivity === "moderate") {
      newRiskOrientation = "managing";
    } else if (sensitivity === "high") {
      newRiskOrientation = "averse";
    }
  } else if (exposure === "high") {
    if (sensitivity === "low") {
      newRiskOrientation = "managing";
    } else if (sensitivity === "moderate") {
      if (capacity === "low" || capacity === "moderate") {
        newRiskOrientation = "averse";
      } else if (capacity === "high") {
        newRiskOrientation = "managing";
      }
    } else if (sensitivity === "high") {
      newRiskOrientation = "averse";
    }
  }
  return newRiskOrientation;
};

export default function RiskOrientation({ options, handleOptionsChange }) {
  const classes = useStyles();

  const handleRiskOrientationChange = (field, newValue) => {
    // Copy risk orientation state to avoid state mutation
    const newRiskOrientation = JSON.parse(JSON.stringify(options["riskOrientation"]));

    // Replace field with the new value
    newRiskOrientation[field] = newValue;

    // Extract the arguments for the decision function and pass them in
    const { exposure, sensitivity, capacity } = newRiskOrientation;
    newRiskOrientation["riskOrientation"] = determineRiskOrientation(exposure, sensitivity, capacity);
    
    // Propogate the changes
    handleOptionsChange("riskOrientation", newRiskOrientation);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={ classes.bodyContainer }>
        <div className={ classes.selectorsContainer }>
          <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
            <p className={ classes.selectText }>Exposure: <span style={{ fontWeight: "normal" }}>The degree to which an asset, site, or system is subject to flooding or other compounding hazards.</span></p>
        
            <div className={ classes.radioContainer }>
              <RadioBoxes
                items={exposureOptions}
                selected={options["riskOrientation"]["exposure"]}
                handleChange={(e) => handleRiskOrientationChange("exposure", e.target.value)}
              />
            </div>
          </div>
          <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
            <p className={ classes.selectText }>Sensitivity: <span style={{ fontWeight: "normal" }}>The extent to which an asset or system&apos;s performance changes when rainfall intensity, duration, or frequency increases.</span></p>
        
            <div className={ classes.radioContainer }>
              <RadioBoxes
                items={sensitivityOptions}
                selected={options["riskOrientation"]["sensitivity"]}
                handleChange={(e) => handleRiskOrientationChange("sensitivity", e.target.value)}
              />
            </div>
          </div>
          <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
            <p className={ classes.selectText }>Adaptive Capacity: <span style={{ fontWeight: "normal" }}>The ability of a system, organization, or community to adjust, recover, or maintain function if performance declines under extreme rainfall.</span></p>
        
            <div className={ classes.radioContainer }>
              <RadioBoxes
                items={capacityOptions}
                selected={options["riskOrientation"]["capacity"]}
                handleChange={(e) => handleRiskOrientationChange("capacity", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <img width="100%" src={process.env.PUBLIC_URL + "/assets/original_risk_orientation_flowchart.jpg"} alt="Flowcharts that show how selected options alter risk orientation outcomes" />
        </div>
      </div>

      <p className={ classes.endnote }>Refer to page X-Y of the decision support guide for more details on these choices.</p>
    </div>
  );
}

RiskOrientation.propTypes = {
  options: PropTypes.object,
  handleOptionsChange: PropTypes.func,
};