import React from "react";
import PropTypes from "prop-types";

import UserSelections from "./panels/UserSelections";
import RiskOrientation from "./panels/RiskOrientation";
import TimePeriod from "./panels/TimePeriod";
import ResourceLevel from "./panels/ResourceLevel";
import ChangeFactorSummary from "./panels/ChangeFactorSummary";

export const siteGuidance = {
  id: "site",
  selectionText: "Design a specific site or project",
  steps: [
    "User Selections",
    "Select a Risk Orientation",
    "Select a Time Period",
    "Select a Resource Level",
  ],
  optionsState: {
    state: undefined,
    station: undefined,
    riskOrientation: {
      exposure: "",
      sensitivity: "",
      capacity: "",
      riskOrientation: ""
    },
    returnPeriod: "",
    duration: "",
    timePeriod: "",
    resourceLevel: ""
  },
  isStepComplete: (step, options) => {
    switch (step) {
    case 1:
      return options !== undefined;
    case 2:
      return  options["station"] !== undefined &&
              options["returnPeriod"] !== "" &&
              options["duration"] !== "";
    case 3:
      return options["riskOrientation"]["riskOrientation"] !== "";
    case 4:
      return options["timePeriod"] !== "";
    case 5:
      return options["resourceLevel"] !== "";
    default:
      return  options !== undefined &&
              options["station"] !== undefined &&
              options["returnPeriod"] !== "" &&
              options["duration"] !== "" &&
              options["riskOrientation"]["riskOrientation"] !== "" &&
              options["timePeriod"] !== "" &&
              options["resourceLevel"] !== "";
    }
  },
  component: SiteGuidance
};

function SiteGuidance({ activeStep, options, handleOptionsChange, data, stations }) {
  switch (activeStep) {
  case 1:
    return <UserSelections
      options={options}
      handleOptionsChange={handleOptionsChange}
      stations={stations}
    />;
  case 2:
    return <RiskOrientation
      options={options}
      handleOptionsChange={handleOptionsChange}
    />;
  case 3:
    return <TimePeriod
      options={options}
      handleOptionsChange={handleOptionsChange}
    />;
  case 4:
    return <ResourceLevel
      options={options}
      handleOptionsChange={handleOptionsChange}
    />;
  case 5:
    return <ChangeFactorSummary
      options={options}
      data={data}
    />;
  default:
    return <>An error has occurred.</>;
  }
}

SiteGuidance.propTypes = {
  options: PropTypes.object,
  handleOptionsChange: PropTypes.func,
  activeStep: PropTypes.number,
  data: PropTypes.object,
  stations: PropTypes.object
};