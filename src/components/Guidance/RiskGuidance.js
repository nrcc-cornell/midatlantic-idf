import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import RadioBoxes from "./RadioBoxes";

export const riskGuidance = {
  id: "risk",
  selectionText: "Assess risk and/or vulnerability",
  steps: [
    "Fake Step"
  ],
  optionsState: {
    fakeOption: "",
  },
  isStepComplete: (step, options) => {
    switch (step) {
    case 1:
      return options !== undefined;
    case 2:
      return options["fakeOption"] !== "";
    default:
      return  options["fakeOption"] !== "";
    }
  },
  component: RiskGuidance
};

const fakeOptions = [
  { value: "fake1", shortName: "Fake Option 1", label: <b>Fake Option 1</b>},
  { value: "fake2", shortName: "Fake Option 2", label: <b>Fake Option 2</b>}
];

const useStyles = makeStyles(() => ({
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  selectorContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-end"
  },
  selector: {
    border: "1px solid rgb(120,120,120)",
    borderRadius: "5px",
    padding: "6px 12px",
    width: "fit-content",
    margin: "24px auto",
  },
}));

function Step2({ options, handleOptionsChange }) {
  const classes = useStyles();

  return (
    <div>
      <p>Some text about this fake option.</p>

      <div className={classes.selectorContainer}>
        <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
          <RadioBoxes
            label="Choose your fake option:"
            items={fakeOptions}
            selected={options["fakeOption"]}
            handleChange={(e) => handleOptionsChange("fakeOption", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function SummaryOfResults({ options, data, selectedLocation }) {
  const classes = useStyles();

  console.log(data);
  const fakeOption = fakeOptions.find(opt => opt.value === options.fakeOption).shortName;

  let results;
  try {
    results = <p>A nice display of results.</p>;
  } catch (error) {
    results = <p>There was a problem finding the requested data. Please try again, try a different location, or try a different combination of options.</p>;
  }

  return (
    <div className={classes.stepContainer}>
      <div style={{ margin: "12px 24px" }}>
        <p style={{ margin: 0 }}><b>Use Case: </b><i>{riskGuidance.selectionText}</i></p>
        <p style={{ margin: 0 }}><b>Fake Option: </b><i>{fakeOption}</i></p>
      </div>

      <div>
        <h2 style={{ textAlign: "center" }}>Recommended Change Factors for station: {selectedLocation["station_name"]}</h2>

        <div>
          {results}
        </div>
      </div>
    </div>
  );
}

function RiskGuidance({ activeStep, options, handleOptionsChange, data, selectedLocation }) {
  switch (activeStep) {
  case 1:
    return <Step2
      options={options}
      handleOptionsChange={handleOptionsChange}
    />;
  case 2:
    return <SummaryOfResults
      options={options}
      data={data}
      selectedLocation={selectedLocation}
    />;
  default:
    return <>An error has occurred.</>;
  }
}


const StepPropTypes = {
  options: PropTypes.object,
  handleOptionsChange: PropTypes.func,
};
RiskGuidance.propTypes = {
  ...StepPropTypes,
  activeStep: PropTypes.number,
  data: PropTypes.object,
  selectedLocation: PropTypes.object,
};
Step2.propTypes = StepPropTypes;
SummaryOfResults.propTypes = {
  ...StepPropTypes,
  data: PropTypes.object,
  selectedLocation: PropTypes.object,
};