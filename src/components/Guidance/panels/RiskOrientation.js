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
    width: "45%"
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
    gap: "12px",
  },
  radioContainer: {
    paddingLeft: "40px"
  },
  imgStackContainer: {
    marginTop: "60px",
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

const exposureOptions = [
  { value: "low", label: "Low", hoverText: "Located on high ground or outside flood-prone areas; no flood history."},
  { value: "moderate", label: "Moderate", hoverText: "Some drainage concerns or occasional localized flooding events."},
  { value: "high", label: "High", hoverText: "Frequent or severe flooding, limited drainage capacity, or multiple overlapping hazards such as tidal or riparian influences."},
];

const sensitivityOptions = [
  { value: "low", label: "Low", hoverText: "Performs reliably under a wide range of conditions or includes redundancy that limits performance loss."},
  { value: "moderate", label: "Moderate", hoverText: "Some degradation in performance under heavier rainfall but retains function or recovers quickly."},
  { value: "high", label: "High", hoverText: "Fails or floods when rainfall modestly exceeds design thresholds."},
];

const capacityOptions = [
  { value: "low", label: "Low", hoverText: "Minimal redundancy or contingency capacity; few operations for temporary or permanent response."},
  { value: "moderate", label: "Moderate", hoverText: "Some alternatives or interim responses exist but may be limited in scope or duration."},
  { value: "high", label: "High", hoverText: "Strong redundancy, clear contingency plans, and access to resources enable continued service or rapid restoration."},
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

  const getFlowchartImageStack = (riskOrientationObj) => {
    const { exposure, sensitivity, capacity, riskOrientation } = riskOrientationObj;
    
    const stack = [];
    if (exposure === "") {
      stack.push(<img key="base-flowchart" src={process.env.PUBLIC_URL + "/assets/flowcharts/risk_orientation_flowchart.jpg"} alt="Flowcharts that show how selected options alter risk orientation outcomes" />);
    } else {
      // Add the base flowchart no matter what
      stack.push(<img key="exposure-overlay" src={process.env.PUBLIC_URL + `/assets/flowcharts/exposure_${exposure}_flowchart.jpg`} alt="Overlay highlighting exposure selection" />);

      if (sensitivity) {
        stack.push(<img key="sensitivity-overlay" src={process.env.PUBLIC_URL + `/assets/flowcharts/exposure_${exposure}_sensitivity_${sensitivity}.png`} alt="Overlay highlighting sensitivity selection" />);

        if (
          (exposure === "low" && (sensitivity === "low" || sensitivity === "high")) ||
          (exposure === "moderate" && (sensitivity === "moderate" || sensitivity === "high")) ||
          (exposure === "high" && (sensitivity === "low" || sensitivity === "high"))
        ) {
          stack.push(<img key="risk-orientation-overlay" src={process.env.PUBLIC_URL + `/assets/flowcharts/exposure_${exposure}_risk_orientation_${riskOrientation}.png`} alt="Overlay highlighting risk orientation selection" />);
        } else if (capacity) {
          stack.push(<img key="capacity-overlay" src={process.env.PUBLIC_URL + `/assets/flowcharts/exposure_${exposure}_capacity_${capacity}.png`} alt="Overlay highlighting capacity selection" />);

          if (riskOrientation) {
            stack.push(<img key="risk-orientation-overlay" src={process.env.PUBLIC_URL + `/assets/flowcharts/exposure_${exposure}_risk_orientation_${riskOrientation}.png`} alt="Overlay highlighting risk orientation selection" />);
          } 
        }
      }
    }

    return (
      <div className={classes.imgStackContainer}>
        {stack}
      </div>
    );
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

        {getFlowchartImageStack(options.riskOrientation)}
      </div>

      <p className={ classes.endnote }>Refer to pages 6-9 of the <a href="https://www.rand.org/pubs/tools/TLA4308-2.html" rel="noreferrer" target="_blank">decision support guide</a> for more details on these choices.</p>
    </div>
  );
}

RiskOrientation.propTypes = {
  options: PropTypes.object,
  handleOptionsChange: PropTypes.func,
};