import React from "react";
import PropTypes from "prop-types";

// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@material-ui/core";

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

// const dataSourceOptions = [
//   { value: "data1", shortName: "CMIP5", label: <b>CMIP5</b>},
//   { value: "data2", shortName: "CMIP6", label: <b>CMIP6</b>}
// ];

// const timePeriodOptions = [
//   { value: "2020-2070", shortName: "2020-2070", label: <b>2020-2070</b>},
//   { value: "2050-2100", shortName: "2050-2100", label: <b>2050-2100</b>},
// ];

// const riskOptions = [
//   { value: "02", shortName: "Risk Tolerant", label: <span><b>Score 0-2: Risk Tolerant.</b> The asset or site is lower risk or highly adaptable. Your goal is to prioritize near-term performance or cost-efficiency and can tolerate more uncertainty</span>},
//   { value: "34", shortName: "Risk Managing", label: <span><b>Score 3-4: Risk Managing.</b> The asset or site faces moderate risk. Your goal is to aim for a balanced design that performs well across a range of futures.</span>},
//   { value: "56", shortName: "Risk Averse", label: <span><b>Score 5-6: Risk Averse.</b> The asset or site is highly exposed or critical, with limited fallback options. Your goal is to avoid worst-case impacts.</span>},
// ];

// const cmip5Options = [
//   { value: "4.5", shortName: "RCP 4.5", label: <b>RCP 4.5</b>},
//   { value: "8.5", shortName: "RCP 8.5", label: <b>RCP 8.5</b>},
// ];

// const cmip6Options = [
//   { value: "4.5", shortName: "RCP 4.5", label: <b>RCP 4.5</b>},
//   { value: "8.5", shortName: "RCP 8.5", label: <b>RCP 8.5</b>},
// ];

// const percentileOptions = [
//   { value: "_median", shortName: "Median", label: <b>Median</b>},
//   { value: "_75th", shortName: "75th Percentile", label: <b>75th Percentile</b>},
//   { value: "_90th", shortName: "90th Percentile", label: <b>90th Percentile</b>},
// ];

// const useStyles = makeStyles(() => ({
//   grid: {
//     display: "grid",
//     width: "90%",
//     margin: "24px auto",
//     fontSize: "13px"
//   },
//   step2Grid: {
//     gridTemplateColumns: "1fr 1fr 2fr",
//     gridTemplateRows: "30px auto auto"
//   },
//   step3Grid: {
//     gridTemplateColumns: "130px repeat(2, 1fr)",
//     gridTemplateRows: "30px repeat(3, auto)"
//   },
//   headerCell: {
//     textAlign: "center",
//     borderTop: "1px solid black",
//     borderBottom: "1px solid black",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontWeight: "bold"
//   },
//   centeredText: {
//     justifyContent: "center",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"
//   },
//   bottomLine: {
//     borderBottom: "1px solid rgb(120,120,120)",
//   },
//   stepContainer: {
//     display: "flex",
//     flexDirection: "column",
//     height: "100%",
//   },
//   selectorContainer: {
//     display: "flex",
//     flexDirection: "column",
//     height: "100%",
//     justifyContent: "flex-end"
//   },
//   selector: {
//     border: "1px solid rgb(120,120,120)",
//     borderRadius: "5px",
//     padding: "6px 12px",
//     width: "fit-content",
//     margin: "24px auto",
//   },
//   leftPaddedCell: {
//     paddingLeft: "12px"
//   },
//   flowchart: {
//     width: "95%",
//     maxWidth: "fit-content",
//     margin: "0 auto"
//   },
//   highlighted: {
//     backgroundColor: "#30f44aff"
//   }
// }));


// function Step5({ options, handleOptionsChange }) {
//   const classes = useStyles();

//   const handlePercentilesChange = (event, item) => {
//     const newPercentiles = JSON.parse(JSON.stringify(options["percentiles"]));
//     newPercentiles[item.value] = event.target.checked;
//     handleOptionsChange("percentiles", newPercentiles);
//   };

//   return (
//     <div>
//       {options["dataSource"] === "data1" ? (
//         <>
//           <div className={classes.flowchart}>
//             <img src={process.env.PUBLIC_URL + "/assets/site-guidance-step-4-cmip5.png"} alt="Flow chart for determining climate scenario" />
//           </div>

//           <div className={classes.selectorContainer}>
//             <div className={classes.selector } style={{ maxWidth: "1000px", display: "flex", gap: "90px" }}>
//               <RadioBoxes
//                 label="Select your climate scenario:"
//                 items={cmip5Options}
//                 selected={options["emissionsScenario"]}
//                 handleChange={(e) => handleOptionsChange("emissionsScenario", e.target.value)}
//               />
//               <CustomCheckboxes
//                 label="Select your uncertainty percentiles (you may select multiple):"
//                 items={percentileOptions}
//                 checked={options["percentiles"]}
//                 handleChange={handlePercentilesChange}
//               />
//             </div>
//           </div>
//         </>
//       ) : options["dataSource"] === "data2" ? (
//         <>
//           <p>Information about CMIP6</p>

//           <div className={classes.selectorContainer}>
//             <div className={classes.selector } style={{ maxWidth: "1000px", display: "flex", gap: "90px" }}>
//               <RadioBoxes
//                 label="Select your climate scenario (would be SSPs instead):"
//                 items={cmip6Options}
//                 selected={options["emissionsScenario"]}
//                 handleChange={(e) => handleOptionsChange("emissionsScenario", e.target.value)}
//               />
//               <CustomCheckboxes
//                 label="Select your uncertainty percentiles (you may select multiple):"
//                 items={percentileOptions}
//                 checked={options["percentiles"]}
//                 handleChange={handlePercentilesChange}
//               />
//             </div>
//           </div>
//         </>
//       ) : (<></>)}
//     </div>
//   );
// }

// function SummaryOfResults({ options, data, selectedLocation }) {
//   const classes = useStyles();

//   const dataSource = dataSourceOptions.find(opt => opt.value === options.dataSource).shortName;
//   const timePeriod = timePeriodOptions.find(opt => opt.value === options.timePeriod).shortName;
//   const riskOrientation = riskOptions.find(opt => opt.value === options.riskOrientation).shortName;
//   const emissionsScenario = cmip5Options.find(opt => opt.value === options.emissionsScenario).shortName;
//   const percentiles = Object.entries(options.percentiles).filter(p => p[1] === true).map(p => percentileOptions.find(opt => opt.value === p[0]).shortName);

//   let results;
//   try {
//     results = 
//       <Table style={{ width: "500px", margin: "0 auto", border: "1px solid rgb(224,224,224)" }}>
//         <TableHead>
//           <TableRow style={{ backgroundColor: "rgb(245,245,245)" }}>
//             <TableCell>Return Period</TableCell>
//             <TableCell>10th</TableCell>
//             <TableCell>25th</TableCell>
//             <TableCell>Median</TableCell>
//             <TableCell>75th</TableCell>
//             <TableCell>90th</TableCell>
//           </TableRow>
//         </TableHead>
        
//         <TableBody>
//           {[2,5,10,25,50,100].map(rp => {
//             const {median, "10%": _10, "90%": _90, "25%": _25, "75%": _75} = data[options.emissionsScenario][options.timePeriod][rp][selectedLocation["fips"]];

//             return (
//               <TableRow key={rp} style={{ width: "100%" }}>
//                 <TableCell>{rp}-year</TableCell>
//                 <TableCell className={options.percentiles._90th ? classes.highlighted : {}}>{_10.toFixed(2)}</TableCell>
//                 <TableCell className={options.percentiles._75th ? classes.highlighted : {}}>{_25.toFixed(2)}</TableCell>
//                 <TableCell className={options.percentiles._median ? classes.highlighted : {}}>{median.toFixed(2)}</TableCell>
//                 <TableCell className={options.percentiles._75th ? classes.highlighted : {}}>{_75.toFixed(2)}</TableCell>
//                 <TableCell className={options.percentiles._90th ? classes.highlighted : {}}>{_90.toFixed(2)}</TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     ;
//   } catch (error) {
//     results = <p>There was a problem finding the requested data. Please try again, try a different location, or try a different combination of options.</p>;
//   }

//   return (
//     <div className={classes.stepContainer}>
//       <div style={{ margin: "12px 24px" }}>
//         <p style={{ margin: 0 }}><b>Use Case: </b><i>{siteGuidance.selectionText}</i></p>
//         <p style={{ margin: 0 }}><b>Data Source: </b><i>{dataSource}</i></p>
//         <p style={{ margin: 0 }}><b>Time-period: </b><i>{timePeriod}</i></p>
//         <p style={{ margin: 0 }}><b>Risk Orientation: </b><i>{riskOrientation}</i></p>
//         <p style={{ margin: 0 }}><b>Climate Scenario: </b><i>{emissionsScenario}</i></p>
//         <p style={{ margin: 0 }}><b>Percentiles: </b><i>{percentiles.join(", ")}</i></p>
//       </div>

//       <div>
//         <h2 style={{ textAlign: "center" }}>Recommended Change Factors for station: {selectedLocation["station_name"]}</h2>

//         <div>
//           {results}
//         </div>
//       </div>

//       <div style={{ margin: "10px 0px 20px 0px", textAlign: "center" }}>
//         <p>Need help communicating your choices/results? <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Click here!</a></p>
//       </div>
//     </div>
//   );
// }

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