import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  mainContainer: {
    padding: "0px 24px",
    display: "flex",
    gap: "20px",
    minHeight: "450px"
  },
  selectionsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "35%",
    margin: "0 auto",
  },
  selectionsMain: {
    border: "1px solid rgb(150,150,150)",
    borderRadius: "5px",
    display: "flex",
    padding: "12px",
    flexDirection: "column",
    justifyContent: "center",
    "& > div": {
      display: "flex",
      justifyContent: "space-between",
      
      "& > p": {
        margin: 0,
      },

      "& > p:nth-child(2)": {
        textAlign: "right"
      }
    }
  },
  highlighted: {
    backgroundColor: "#30f44aff"
  },
  minHighlight: {
    backgroundColor: "rgb(224, 253, 228)"
  },
  cfsTable: {
    border: "1px solid rgb(150,150,150)",
    borderRadius: "5px",
    width: "50%",
    overflow: "hidden"
  },
  durationsTable: {
    borderTop: "1px solid rgb(150,150,150)",
    width: "100%",
    overflow: "hidden"
  },
  tableColRightBorder: {
    borderRight: "1px solid rgb(220,220,220) !important",
  },
  recCFsBottomRow: {
    "& > .MuiTableCell-root": {
      border: "none"
    }
  },
  tableContainer: {
    border: "1px solid rgb(150,150,150)",
    borderRadius: "5px",
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "24px auto",
    overflow: "hidden"
  },
  tableLabel: {
    fontSize: "24px",
    textAlign: "center",
    margin: "12px 0px"
  },
  label: {
    fontSize: "24px",
    textAlign: "center",
    margin: "0px 0px 12px"
  },
  tableHeader: {
    backgroundColor: "#fafafa"
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
  },
  recommendationContainer: {
    border: "1px solid rgb(150,150,150)",
    borderRadius: "5px",
    display: "flex",
    gap: "12px",
    flexDirection: "column",
    alignItems: "center",
    margin: "24px auto",
    padding: "12px",
    width: "fit-content"
  },
  recommendationTitle: {
    fontSize: "24px",
    textAlign: "center",
    margin: 0
  },
  recommendationMain: {
    display: "flex",
    gap: "12px"
  },
  recommendationAnd: {
    fontSize: "20px" 
  },
  recommendation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  recommendationCf: {
    fontSize: "50px",
    lineHeight: "44px",
    fontWeight: "bold",
    margin: "0",
    height: "fit-content"
  },
  recommendationPercentile: {
    fontSize: "14px",
    fontStyle: "italic",
    color: "rgb(100,100,100)",
    margin: "0",
    height: "fit-content",
    width: "fit-content",
  }
}));

export default function ChangeFactorSummary({ options, data }) {
  const classes = useStyles();

  let emissionsScenario;
  const percentiles = {
    _10th: false,
    _25th: false,
    _median: false,
    _75th: false,
    _90th: false
  };

  if (options.riskOrientation.riskOrientation === "tolerant") {
    emissionsScenario = "4.5";
    percentiles._median = true;

    if (options.resourceLevel !== "low") {
      percentiles._75th = true;
    }
  } else if (options.riskOrientation.riskOrientation === "managing") {
    emissionsScenario = "4.5";
    percentiles._75th = true;

    if (options.resourceLevel !== "low") {
      percentiles._90th = true;
    }
  } else if (options.riskOrientation.riskOrientation === "averse") {
    emissionsScenario = "8.5";
    percentiles._median = true;

    if (options.resourceLevel !== "low") {
      percentiles._75th = true;
    }
  }

  const {median: _median, "10%": _10th, "90%": _90th, "25%": _25th, "75%": _75th} = data[emissionsScenario][options.timePeriod][options.returnPeriod][options.station.fips];
  const cfs = {_median, _10th, _90th, _25th, _75th};

  const cfsToShow = ["_median","_75th","_90th"].reduce((acc, k) => {
    if (percentiles[k]) {
      acc.push([cfs[k], k]);
    }
    return acc;
  }, []);

  const station = options.station;
  const categories = ["5min", "10min", "15min", "30min", "60min", "2hr", "3hr", "6hr", "12hr", "24hr", "2day", "3day", "4day", "7day"];

  const determineHighlighting = (isDuration, isPercentile, additionalClasses=[]) => {
    const allClasses = [...additionalClasses];

    if (isDuration && isPercentile) {
      allClasses.push(classes.highlighted);
    } else if (isDuration || isPercentile) {
      allClasses.push(classes.minHighlight);
    }

    return clsx(...allClasses);
  };

  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatDurationString = (str) => {
    return str.replace("min", " min").replace("hr", " hr").replace("day", " day");
  };

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
    <>
      <div className={classes.mainContainer}>
        {getFlowchartImageStack(options.riskOrientation.riskOrientation, options.resourceLevel)}

        <div className={ classes.selectionsContainer }>
          <div className={classes.selectionsMain}>
            <p className={classes.label}>Your Selections</p>
            <div>
              <p><b>Station Name</b>:</p>
              <p>{options["station"]["station_name"]}</p>
            </div>
            <div>
              <p><b>Return Period</b>:</p>
              <p>{options["returnPeriod"]}-yr</p>
            </div>
            <div>
              <p><b>Duration</b>:</p>
              <p>{formatDurationString(options["duration"])}</p>
            </div>
            <div>
              <p><b>Exposure</b>:</p>
              <p>{capitalizeFirstLetter(options["riskOrientation"]["exposure"])}</p>
            </div>
            <div>
              <p><b>Sensitivity</b>:</p>
              <p>{capitalizeFirstLetter(options["riskOrientation"]["sensitivity"])}</p>
            </div>
            <div>
              <p><b>Capacity</b>:</p>
              <p>{capitalizeFirstLetter(options["riskOrientation"]["capacity"])}</p>
            </div>
            <div>
              <p><b>Orientation</b>:</p>
              <p>{capitalizeFirstLetter(options["riskOrientation"]["riskOrientation"])}</p>
            </div>
            <div>
              <p><b>Time Period</b>:</p>
              <p>{options["timePeriod"]}</p>
            </div>
            <div>
              <p><b>Resource Level</b>:</p>
              <p>{options["resourceLevel"].length > 3 ? "Moderate/High" : "Low"}</p>
            </div>
            <div>
              <p><b>Emissions Scenario</b>:</p>
              <p>RCP {emissionsScenario}</p>
            </div>
          </div>
        </div>
      </div>


      <div className={classes.recommendationContainer}>
        <p className={classes.recommendationTitle}>Your recommended Change Factor{cfsToShow.length > 1 ? "s" : ""}</p>
        
        {/* <div className={classes.cfsTable}>
          <Table>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell className={classes.tableColRightBorder}>Percentile</TableCell>
                <TableCell align="center">10th</TableCell>
                <TableCell align="center">25th</TableCell>
                <TableCell align="center">Median</TableCell>
                <TableCell align="center">75th</TableCell>
                <TableCell align="center">90th</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.recCFsBottomRow}>
                <TableCell className={classes.tableColRightBorder} align="center">Change Factors</TableCell>
                <TableCell className={percentiles._90th ? classes.highlighted : ""} align="center">{_10.toFixed(2)}</TableCell>
                <TableCell className={percentiles._75th ? classes.highlighted : ""} align="center">{_25.toFixed(2)}</TableCell>
                <TableCell className={percentiles._median ? classes.highlighted : ""} align="center">{median.toFixed(2)}</TableCell>
                <TableCell className={percentiles._75th ? classes.highlighted : ""} align="center">{_75.toFixed(2)}</TableCell>
                <TableCell className={percentiles._90th ? classes.highlighted : ""} align="center">{_90.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div> */}
        
        
        
        <div className={classes.recommendationMain}>
          {cfsToShow.map(([cf, k], i) => {
            return <React.Fragment key={k}>
              {i > 0 && <p className={classes.recommendationAnd}>&</p>}
              <div className={classes.recommendation}>
                <p className={classes.recommendationCf}>{cf.toFixed(2)}</p>
                <p className={classes.recommendationPercentile}>({k.slice(1)})</p>
              </div>
            </React.Fragment>;
          })}
        </div>
      </div>

      <div className={classes.tableContainer}>
        <p className={classes.tableLabel}>Depths for {options.returnPeriod}-year Storm</p>

        <div className={classes.durationsTable}>
          <Table>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell className={classes.tableColRightBorder}>Percentile</TableCell>
                <TableCell align="center">10th</TableCell>
                <TableCell align="center">25th</TableCell>
                <TableCell align="center">Median</TableCell>
                <TableCell align="center">75th</TableCell>
                <TableCell className={classes.tableColRightBorder} align="center">90th</TableCell>
                <TableCell rowSpan={2} align="center">Atlas 14 Depth (inches)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableColRightBorder}>Duration</TableCell>
                <TableCell className={classes.tableColRightBorder} colSpan={5} align="center">Projected {options.timePeriod} Depth (inches)</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {categories.map((duration) => {
                const isDuration = duration === options.duration;
                return (
                  <TableRow key={duration}>
                    <TableCell className={determineHighlighting(isDuration, false, [classes.tableColRightBorder])} align="center">{formatDurationString(duration)}</TableCell>
                    <TableCell className={determineHighlighting(isDuration, percentiles._10th)} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*_10th).toFixed(2)}</TableCell>
                    <TableCell className={determineHighlighting(isDuration, percentiles._25th)} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*_25th).toFixed(2)}</TableCell>
                    <TableCell className={determineHighlighting(isDuration, percentiles._median)} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*_median).toFixed(2)}</TableCell>
                    <TableCell className={determineHighlighting(isDuration, percentiles._75th)} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*_75th).toFixed(2)}</TableCell>
                    <TableCell className={determineHighlighting(isDuration, percentiles._90th, [classes.tableColRightBorder])} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*_90th).toFixed(2)}</TableCell>
                    <TableCell className="col-shaded" align="center">{parseFloat(station[duration][`${options["returnPeriod"]}-mid`])}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

ChangeFactorSummary.propTypes = {
  options: PropTypes.object,
  data: PropTypes.object,
};
