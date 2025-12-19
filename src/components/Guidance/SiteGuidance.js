import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import clsx from "clsx";

import RadioBoxes from "./RadioBoxes";
import CustomCheckboxes from "./CustomCheckboxes";

export const siteGuidance = {
  id: "site",
  selectionText: "Design a specific site or project",
  steps: [
    "Choose your data source",
    "Selecting a time period",
    "Determine your risk orientation",
    "Selecting your climate scenario and uncertainty percentile",
  ],
  optionsState: {
    dataSource: "",
    timePeriod: "",
    riskOrientationScores: {
      consequences: "",
      exposure: "",
      capacity: ""
    },
    riskOrientation: "",
    emissionsScenario: "",
    percentiles: {
      _median: false,
      _75th: false,
      _90th: false
    }
  },
  isStepComplete: (step, options) => {
    switch (step) {
    case 1:
      return options !== undefined;
    case 2:
      return options["dataSource"] !== "";
    case 3:
      return options["timePeriod"] !== "";
    case 4:
      return options["riskOrientation"] !== "";
    case 5:
      return options["emissionsScenario"] !== "" && Object.values(options["percentiles"]).includes(true);
    default:
      return  options["dataSource"] !== "" &&
              options["timePeriod"] !== "" &&
              options["riskOrientation"] !== "" &&
              options["emissionsScenario"] !== "" && Object.values(options["percentiles"]).includes(true);
    }
  },
  component: SiteGuidance
};

const dataSourceOptions = [
  { value: "data1", shortName: "CMIP5", label: <b>CMIP5</b>},
  { value: "data2", shortName: "CMIP6", label: <b>CMIP6</b>}
];

const timePeriodOptions = [
  { value: "2020-2070", shortName: "2020-2070", label: <b>2020-2070</b>},
  { value: "2050-2100", shortName: "2050-2100", label: <b>2050-2100</b>},
];

const riskOptions = [
  { value: "02", shortName: "Risk Tolerant", label: <span><b>Score 0-2: Risk Tolerant.</b> The asset or site is lower risk or highly adaptable. Your goal is to prioritize near-term performance or cost-efficiency and can tolerate more uncertainty</span>},
  { value: "34", shortName: "Risk Managing", label: <span><b>Score 3-4: Risk Managing.</b> The asset or site faces moderate risk. Your goal is to aim for a balanced design that performs well across a range of futures.</span>},
  { value: "56", shortName: "Risk Averse", label: <span><b>Score 5-6: Risk Averse.</b> The asset or site is highly exposed or critical, with limited fallback options. Your goal is to avoid worst-case impacts.</span>},
];

const cmip5Options = [
  { value: "4.5", shortName: "RCP 4.5", label: <b>RCP 4.5</b>},
  { value: "8.5", shortName: "RCP 8.5", label: <b>RCP 8.5</b>},
];

const cmip6Options = [
  { value: "4.5", shortName: "RCP 4.5", label: <b>RCP 4.5</b>},
  { value: "8.5", shortName: "RCP 8.5", label: <b>RCP 8.5</b>},
];

const percentileOptions = [
  { value: "_median", shortName: "Median", label: <b>Median</b>},
  { value: "_75th", shortName: "75th Percentile", label: <b>75th Percentile</b>},
  { value: "_90th", shortName: "90th Percentile", label: <b>90th Percentile</b>},
];

const useStyles = makeStyles(() => ({
  grid: {
    display: "grid",
    width: "90%",
    margin: "24px auto",
    fontSize: "13px"
  },
  step2Grid: {
    gridTemplateColumns: "1fr 1fr 2fr",
    gridTemplateRows: "30px auto auto"
  },
  step3Grid: {
    gridTemplateColumns: "130px repeat(2, 1fr)",
    gridTemplateRows: "30px repeat(3, auto)"
  },
  headerCell: {
    textAlign: "center",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold"
  },
  centeredText: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  bottomLine: {
    borderBottom: "1px solid rgb(120,120,120)",
  },
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
  leftPaddedCell: {
    paddingLeft: "12px"
  },
  flowchart: {
    width: "95%",
    maxWidth: "fit-content",
    margin: "0 auto"
  },
  highlighted: {
    backgroundColor: "#30f44aff"
  }
}));

function Step2({ options, handleOptionsChange }) {
  const classes = useStyles();

  const handleDataSourceChange = (e) => {
    if ((!options["emissionsScenario"] && !Object.values(options["percentiles"]).includes(true)) || confirm("Changing this value will clear your selections for climate scenario and uncertainty percentiles. Continue?") ) {
      handleOptionsChange("dataSource", e.target.value);
      handleOptionsChange("emissionsScenario", "");
      handleOptionsChange("percentiles", {
        _median: false,
        _75th: false,
        _90th: false
      });
    }
  };

  return (
    <div>
      <p>Some text about CMIP5 vs. CMIP6</p>

      <div className={classes.selectorContainer}>
        <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
          <RadioBoxes
            label="Choose your data source:"
            items={dataSourceOptions}
            selected={options["dataSource"]}
            handleChange={handleDataSourceChange}
          />
        </div>
      </div>
    </div>
  );
}

function Step3({ options, handleOptionsChange }) {
  const classes = useStyles();
  return (
    <div className={classes.stepContainer}>
      <p style={{ marginTop: "0px" }}>The appropriate time-period depends on the lifespan of the system or site design and the planning horizon of your decision. Longer-lived or inflexible systems may be more affected by changes projected later in the century, while shorter-term projects may only need to consider mid-century conditions.</p>

      <div className={clsx(classes.grid, classes.step2Grid)}>
        <div className={classes.headerCell}>
          <p>Design Context</p>
        </div>
        <div className={classes.headerCell}>
          <p>Recommended Time Period</p>
        </div>
        <div className={classes.headerCell}>
          <p>Rationale</p>
        </div>

        <div className={classes.bottomLine}>
          <p>Project, site, or asset expected to function for less than ~30 years</p>
        </div>
        <div className={clsx(classes.centeredText, classes.bottomLine)}>
          <p>2020-2070 (mid-century)</p>
        </div>
        <div className={classes.bottomLine}>
          <p>Captures changes expected within the functional life of the project or asset; appropriate for short-lived or flexible designs.</p>
        </div>

        <div className={classes.bottomLine}>
          <p>Project, site, or asset expected to function for 30 years or more</p>
        </div>
        <div className={clsx(classes.centeredText, classes.bottomLine)}>
          <p>2050-2100 (late-century)</p>
        </div>
        <div className={classes.bottomLine}>
          <p>Reflects long-term exposure over the life of the project or system; supports durable, future-ready design.</p>
        </div>
      </div>

      <p><b>Note</b>: For projects or assets expected to last 30 years or more, 2050-2100 projections are generally recommended to account for long-term exposure and changing rainfall patterns.</p>

      <div className={classes.selectorContainer}>
        <div className={ classes.selector }>
          <RadioBoxes
            label="Make your selection:"
            items={timePeriodOptions}
            selected={options["timePeriod"]}
            handleChange={(e) => handleOptionsChange("timePeriod", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function Step4({ options, handleOptionsChange }) {
  const classes = useStyles();

  const handleRiskOrientationChange = (field, newValue) => {
    const newRiskOrientation = JSON.parse(JSON.stringify(options["riskOrientationScores"]));
    newRiskOrientation[field] = newValue;
    handleOptionsChange("riskOrientationScores", newRiskOrientation);

    if (!Object.values(newRiskOrientation).includes("")) {
      const riskSum = Object.values(newRiskOrientation).reduce((s, strV) => {
        return s + parseInt(strV);
      }, 0);

      let riskValue;
      if (riskSum <= 2) {
        riskValue = "02";
      } else if (riskSum <= 4) {
        riskValue = "34";
      } else {
        riskValue = "56";
      }
      
      handleOptionsChange("riskOrientation", riskValue);
    }
  };

  return (
    <div className={classes.stepContainer}>
      <p style={{ marginTop: "0px" }}>Determining your risk orientation helps inform how cautious or flexible you need or would like to be when planning for future conditions. The table below is designed to help you assess the risk associated with your decision. Use the guiding questions to select a score that best describes your decision context for each dimension.</p>

      <div className={clsx(classes.grid, classes.step3Grid)}>
        <div className={classes.headerCell}>
          <p>Dimension</p>
        </div>
        <div className={classes.headerCell}>
          <p>Guiding Questions</p>
        </div>
        <div className={classes.headerCell}>
          <p>Select Score</p>
        </div>

        <div className={classes.bottomLine}>
          <p style={{ fontWeight: "bold" }}>Potential Impacts</p>
        </div>
        <div className={clsx(classes.bottomLine, classes.leftPaddedCell)}>
          <p style={{ fontWeight: "bold" }}>What would happen if this asset or site failed under extreme future rainfall?</p>
          <p>Consider the potential for harm to health, safety, mobility, economic activity, or environmental resources. Consider how disruptive or costly it would be to repair.</p>
        </div>
        <div className={clsx(classes.bottomLine, classes.leftPaddedCell)}>
          <RadioBoxes
            items={[
              { value: "0", label: <span><b>0 = Minor Consequences</b> (e.g., localized inconvenience, minor damage)</span>},
              { value: "1", label: <span><b>1 = Moderate Consequences</b> (e.g., service disruption, moderate damage)</span>},
              { value: "2", label: <span><b>2 = Severe Consequences</b> (e.g., loss of critical function, major damage)</span>},
            ]}
            selected={options["riskOrientationScores"]["consequences"]}
            handleChange={(e) => handleRiskOrientationChange("consequences", e.target.value)}
          />
        </div>

        <div className={classes.bottomLine}>
          <p style={{ fontWeight: "bold" }}>Exposure</p>
        </div>
        <div className={clsx(classes.bottomLine, classes.leftPaddedCell)}>
          <p style={{ fontWeight: "bold" }}>How exposed is the asset or site to compounding flood hazards?</p>
          <p>Consider flood history, site characteristics, and projected increases in exposure (e.g., sea level rise, anticipated upstream development and land use change, population growth).</p>
        </div>
        <div className={clsx(classes.bottomLine, classes.leftPaddedCell)}>
          <RadioBoxes
            items={[
              { value: "0", label: <span><b>0 = Minimal exposure</b> (e.g., located on high ground)</span>},
              { value: "1", label: <span><b>1 = Moderate exposure</b> (e.g., some drainage concerns)</span>},
              { value: "2", label: <span><b>2 = High exposure</b> (e.g., high amount of impervious surface)</span>},
            ]}
            selected={options["riskOrientationScores"]["exposure"]}
            handleChange={(e) => handleRiskOrientationChange("exposure", e.target.value)}
          />
        </div>

        <div className={classes.bottomLine}>
          <p style={{ fontWeight: "bold" }}>Adaptive Capacity</p>
        </div>
        <div className={clsx(classes.bottomLine, classes.leftPaddedCell)}>
          <p style={{ fontWeight: "bold" }}>How well could surrounding systems or communities adapt if the asset or site fails to perform as designed?</p>
          <p>Consider availability of detours, backups, and the ability of communities and institutions to respond.</p>
        </div>
        <div className={clsx(classes.bottomLine, classes.leftPaddedCell)}>
          <RadioBoxes
            items={[
              { value: "0", label: <span><b>0 = High capacity</b> (e.g., strong redundancy, clear contingency plans, access to resources)</span>},
              { value: "1", label: <span><b>1 = Moderate capacity</b> (e.g., some alternatives or support in place)</span>},
              { value: "2", label: <span><b>2 = Low capacity</b> (e.g., limited detours, weak emergency response capacity)</span>},
            ]}
            selected={options["riskOrientationScores"]["capacity"]}
            handleChange={(e) => handleRiskOrientationChange("capacity", e.target.value)}
          />
        </div>
      </div>

      <div className={classes.selectorContainer}>
        <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
          <RadioBoxes
            label="Select your risk orientation:"
            items={riskOptions}
            selected={options["riskOrientation"]}
            handleChange={(e) => handleOptionsChange("riskOrientation", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function Step5({ options, handleOptionsChange }) {
  const classes = useStyles();

  const handlePercentilesChange = (event, item) => {
    const newPercentiles = JSON.parse(JSON.stringify(options["percentiles"]));
    newPercentiles[item.value] = event.target.checked;
    handleOptionsChange("percentiles", newPercentiles);
  };

  return (
    <div>
      {options["dataSource"] === "data1" ? (
        <>
          <div className={classes.flowchart}>
            <img src={process.env.PUBLIC_URL + "/assets/site-guidance-step-4-cmip5.png"} alt="Flow chart for determining climate scenario" />
          </div>

          <div className={classes.selectorContainer}>
            <div className={classes.selector } style={{ maxWidth: "1000px", display: "flex", gap: "90px" }}>
              <RadioBoxes
                label="Select your climate scenario:"
                items={cmip5Options}
                selected={options["emissionsScenario"]}
                handleChange={(e) => handleOptionsChange("emissionsScenario", e.target.value)}
              />
              <CustomCheckboxes
                label="Select your uncertainty percentiles (you may select multiple):"
                items={percentileOptions}
                checked={options["percentiles"]}
                handleChange={handlePercentilesChange}
              />
            </div>
          </div>
        </>
      ) : options["dataSource"] === "data2" ? (
        <>
          <p>Information about CMIP6</p>

          <div className={classes.selectorContainer}>
            <div className={classes.selector } style={{ maxWidth: "1000px", display: "flex", gap: "90px" }}>
              <RadioBoxes
                label="Select your climate scenario (would be SSPs instead):"
                items={cmip6Options}
                selected={options["emissionsScenario"]}
                handleChange={(e) => handleOptionsChange("emissionsScenario", e.target.value)}
              />
              <CustomCheckboxes
                label="Select your uncertainty percentiles (you may select multiple):"
                items={percentileOptions}
                checked={options["percentiles"]}
                handleChange={handlePercentilesChange}
              />
            </div>
          </div>
        </>
      ) : (<></>)}
    </div>
  );
}

function SummaryOfResults({ options, data, selectedLocation }) {
  const classes = useStyles();

  const dataSource = dataSourceOptions.find(opt => opt.value === options.dataSource).shortName;
  const timePeriod = timePeriodOptions.find(opt => opt.value === options.timePeriod).shortName;
  const riskOrientation = riskOptions.find(opt => opt.value === options.riskOrientation).shortName;
  const emissionsScenario = cmip5Options.find(opt => opt.value === options.emissionsScenario).shortName;
  const percentiles = Object.entries(options.percentiles).filter(p => p[1] === true).map(p => percentileOptions.find(opt => opt.value === p[0]).shortName);

  let results;
  try {
    results = 
      <Table style={{ width: "500px", margin: "0 auto", border: "1px solid rgb(224,224,224)" }}>
        <TableHead>
          <TableRow style={{ backgroundColor: "rgb(245,245,245)" }}>
            <TableCell>Return Period</TableCell>
            <TableCell>10th</TableCell>
            <TableCell>25th</TableCell>
            <TableCell>Median</TableCell>
            <TableCell>75th</TableCell>
            <TableCell>90th</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {[2,5,10,25,50,100].map(rp => {
            const {median, "10%": _10, "90%": _90, "25%": _25, "75%": _75} = data[options.emissionsScenario][options.timePeriod][rp][selectedLocation["fips"]];

            return (
              <TableRow key={rp} style={{ width: "100%" }}>
                <TableCell>{rp}-year</TableCell>
                <TableCell className={options.percentiles._90th ? classes.highlighted : {}}>{_10.toFixed(2)}</TableCell>
                <TableCell className={options.percentiles._75th ? classes.highlighted : {}}>{_25.toFixed(2)}</TableCell>
                <TableCell className={options.percentiles._median ? classes.highlighted : {}}>{median.toFixed(2)}</TableCell>
                <TableCell className={options.percentiles._75th ? classes.highlighted : {}}>{_75.toFixed(2)}</TableCell>
                <TableCell className={options.percentiles._90th ? classes.highlighted : {}}>{_90.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    ;
  } catch (error) {
    results = <p>There was a problem finding the requested data. Please try again, try a different location, or try a different combination of options.</p>;
  }

  return (
    <div className={classes.stepContainer}>
      <div style={{ margin: "12px 24px" }}>
        <p style={{ margin: 0 }}><b>Use Case: </b><i>{siteGuidance.selectionText}</i></p>
        <p style={{ margin: 0 }}><b>Data Source: </b><i>{dataSource}</i></p>
        <p style={{ margin: 0 }}><b>Time-period: </b><i>{timePeriod}</i></p>
        <p style={{ margin: 0 }}><b>Risk Orientation: </b><i>{riskOrientation}</i></p>
        <p style={{ margin: 0 }}><b>Climate Scenario: </b><i>{emissionsScenario}</i></p>
        <p style={{ margin: 0 }}><b>Percentiles: </b><i>{percentiles.join(", ")}</i></p>
      </div>

      <div>
        <h2 style={{ textAlign: "center" }}>Recommended Change Factors for station: {selectedLocation["station_name"]}</h2>

        <div>
          {results}
        </div>
      </div>

      <div style={{ margin: "10px 0px 20px 0px", textAlign: "center" }}>
        <p>Need help communicating your choices/results? <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Click here!</a></p>
      </div>
    </div>
  );
}

function SiteGuidance({ activeStep, options, handleOptionsChange, data, selectedLocation }) {
  switch (activeStep) {
  case 1:
    return <Step2
      options={options}
      handleOptionsChange={handleOptionsChange}
    />;
  case 2:
    return <Step3
      options={options}
      handleOptionsChange={handleOptionsChange}
    />;
  case 3:
    return <Step4
      options={options}
      handleOptionsChange={handleOptionsChange}
    />;
  case 4:
    return <Step5
      options={options}
      handleOptionsChange={handleOptionsChange}
    />;
  case 5:
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
SiteGuidance.propTypes = {
  ...StepPropTypes,
  activeStep: PropTypes.number,
  data: PropTypes.object,
  selectedLocation: PropTypes.object,
};
Step2.propTypes = StepPropTypes;
Step3.propTypes = StepPropTypes;
Step4.propTypes = StepPropTypes;
Step5.propTypes = StepPropTypes;
SummaryOfResults.propTypes = {
  ...StepPropTypes,
  data: PropTypes.object,
  selectedLocation: PropTypes.object,
};