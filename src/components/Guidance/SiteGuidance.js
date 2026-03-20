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
    // dataSource: "",
    // emissionsScenario: "",
    // percentiles: {
    //   _median: false,
    //   _75th: false,
    //   _90th: false
    // },
    

    station: {
      "fips": "24025",
      "station_name": "CONOWINGO DAM",
      "state": "MD",
      "latitude": "39.6556",
      "longitude": "-76.1750",
      "5min": {
        "2-mid": "0.41",
        "2-bound": [
          0.36,
          0.46
        ],
        "5-mid": "0.48",
        "5-bound": [
          0.43,
          0.54
        ],
        "10-mid": "0.54",
        "10-bound": [
          0.48,
          0.6
        ],
        "25-mid": "0.6",
        "25-bound": [
          0.53,
          0.68
        ],
        "50-mid": "0.65",
        "50-bound": [
          0.57,
          0.73
        ],
        "100-mid": "0.69",
        "100-bound": [
          0.61,
          0.78
        ]
      },
      "10min": {
        "2-mid": "0.65",
        "2-bound": [
          0.58,
          0.74
        ],
        "5-mid": "0.77",
        "5-bound": [
          0.69,
          0.87
        ],
        "10-mid": "0.86",
        "10-bound": [
          0.76,
          0.96
        ],
        "25-mid": "0.96",
        "25-bound": [
          0.85,
          1.08
        ],
        "50-mid": "1.03",
        "50-bound": [
          0.91,
          1.16
        ],
        "100-mid": "1.1",
        "100-bound": [
          0.97,
          1.24
        ]
      },
      "15min": {
        "2-mid": "0.82",
        "2-bound": [
          0.73,
          0.93
        ],
        "5-mid": "0.98",
        "5-bound": [
          0.87,
          1.1
        ],
        "10-mid": "1.09",
        "10-bound": [
          0.96,
          1.22
        ],
        "25-mid": "1.22",
        "25-bound": [
          1.08,
          1.37
        ],
        "50-mid": "1.31",
        "50-bound": [
          1.15,
          1.47
        ],
        "100-mid": "1.4",
        "100-bound": [
          1.22,
          1.57
        ]
      },
      "30min": {
        "2-mid": "1.14",
        "2-bound": [
          1.01,
          1.28
        ],
        "5-mid": "1.39",
        "5-bound": [
          1.24,
          1.56
        ],
        "10-mid": "1.57",
        "10-bound": [
          1.4,
          1.77
        ],
        "25-mid": "1.8",
        "25-bound": [
          1.59,
          2.02
        ],
        "50-mid": "1.97",
        "50-bound": [
          1.74,
          2.21
        ],
        "100-mid": "2.14",
        "100-bound": [
          1.88,
          2.4
        ]
      },
      "60min": {
        "2-mid": "1.42",
        "2-bound": [
          1.27,
          1.6
        ],
        "5-mid": "1.78",
        "5-bound": [
          1.59,
          2
        ],
        "10-mid": "2.05",
        "10-bound": [
          1.82,
          2.3
        ],
        "25-mid": "2.4",
        "25-bound": [
          2.12,
          2.69
        ],
        "50-mid": "2.67",
        "50-bound": [
          2.35,
          3
        ],
        "100-mid": "2.94",
        "100-bound": [
          2.58,
          3.31
        ]
      },
      "2hr": {
        "2-mid": "1.72",
        "2-bound": [
          1.53,
          1.92
        ],
        "5-mid": "2.17",
        "5-bound": [
          1.93,
          2.42
        ],
        "10-mid": "2.52",
        "10-bound": [
          2.23,
          2.81
        ],
        "25-mid": "3.0",
        "25-bound": [
          2.65,
          3.34
        ],
        "50-mid": "3.39",
        "50-bound": [
          2.98,
          3.78
        ],
        "100-mid": "3.81",
        "100-bound": [
          3.33,
          4.25
        ]
      },
      "3hr": {
        "2-mid": "1.86",
        "2-bound": [
          1.68,
          2.08
        ],
        "5-mid": "2.35",
        "5-bound": [
          2.11,
          2.62
        ],
        "10-mid": "2.74",
        "10-bound": [
          2.45,
          3.05
        ],
        "25-mid": "3.27",
        "25-bound": [
          2.91,
          3.64
        ],
        "50-mid": "3.71",
        "50-bound": [
          3.29,
          4.13
        ],
        "100-mid": "4.18",
        "100-bound": [
          3.67,
          4.64
        ]
      },
      "6hr": {
        "2-mid": "2.31",
        "2-bound": [
          2.08,
          2.58
        ],
        "5-mid": "2.9",
        "5-bound": [
          2.61,
          3.24
        ],
        "10-mid": "3.4",
        "10-bound": [
          3.04,
          3.79
        ],
        "25-mid": "4.11",
        "25-bound": [
          3.66,
          4.58
        ],
        "50-mid": "4.71",
        "50-bound": [
          4.16,
          5.24
        ],
        "100-mid": "5.36",
        "100-bound": [
          4.69,
          5.96
        ]
      },
      "12hr": {
        "2-mid": "2.84",
        "2-bound": [
          2.53,
          3.22
        ],
        "5-mid": "3.6",
        "5-bound": [
          3.2,
          4.08
        ],
        "10-mid": "4.24",
        "10-bound": [
          3.76,
          4.81
        ],
        "25-mid": "5.21",
        "25-bound": [
          4.57,
          5.9
        ],
        "50-mid": "6.05",
        "50-bound": [
          5.26,
          6.83
        ],
        "100-mid": "6.99",
        "100-bound": [
          6.01,
          7.89
        ]
      },
      "24hr": {
        "2-mid": "3.26",
        "2-bound": [
          3.01,
          3.57
        ],
        "5-mid": "4.17",
        "5-bound": [
          3.85,
          4.56
        ],
        "10-mid": "4.98",
        "10-bound": [
          4.56,
          5.43
        ],
        "25-mid": "6.19",
        "25-bound": [
          5.63,
          6.72
        ],
        "50-mid": "7.26",
        "50-bound": [
          6.55,
          7.86
        ],
        "100-mid": "8.46",
        "100-bound": [
          7.56,
          9.14
        ]
      },
      "2day": {
        "2-mid": "3.8",
        "2-bound": [
          3.5,
          4.16
        ],
        "5-mid": "4.86",
        "5-bound": [
          4.46,
          5.32
        ],
        "10-mid": "5.76",
        "10-bound": [
          5.27,
          6.29
        ],
        "25-mid": "7.1",
        "25-bound": [
          6.46,
          7.73
        ],
        "50-mid": "8.26",
        "50-bound": [
          7.46,
          8.97
        ],
        "100-mid": "9.55",
        "100-bound": [
          8.55,
          10.3
        ]
      },
      "3day": {
        "2-mid": "3.99",
        "2-bound": [
          3.68,
          4.36
        ],
        "5-mid": "5.09",
        "5-bound": [
          4.68,
          5.56
        ],
        "10-mid": "6.02",
        "10-bound": [
          5.53,
          6.57
        ],
        "25-mid": "7.42",
        "25-bound": [
          6.76,
          8.07
        ],
        "50-mid": "8.63",
        "50-bound": [
          7.81,
          9.36
        ],
        "100-mid": "9.97",
        "100-bound": [
          8.95,
          10.8
        ]
      },
      "4day": {
        "2-mid": "4.17",
        "2-bound": [
          3.85,
          4.55
        ],
        "5-mid": "5.32",
        "5-bound": [
          4.9,
          5.8
        ],
        "10-mid": "6.3",
        "10-bound": [
          5.79,
          6.84
        ],
        "25-mid": "7.75",
        "25-bound": [
          7.07,
          8.4
        ],
        "50-mid": "9.0",
        "50-bound": [
          8.16,
          9.75
        ],
        "100-mid": "10.4",
        "100-bound": [
          9.35,
          11.2
        ]
      },
      "7day": {
        "2-mid": "4.86",
        "2-bound": [
          4.5,
          5.28
        ],
        "5-mid": "6.12",
        "5-bound": [
          5.67,
          6.64
        ],
        "10-mid": "7.2",
        "10-bound": [
          6.64,
          7.8
        ],
        "25-mid": "8.8",
        "25-bound": [
          8.06,
          9.51
        ],
        "50-mid": "10.2",
        "50-bound": [
          9.25,
          11
        ],
        "100-mid": "11.7",
        "100-bound": [
          10.6,
          12.6
        ]
      }
    },
    // station: undefined,
    riskOrientation: {
      exposure: "low",
      sensitivity: "low",
      capacity: "low",
      riskOrientation: "tolerant"
    },
    returnPeriod: 2,
    duration: "5min",
    timePeriod: "2020-2070",
    resourceLevel: "low"
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