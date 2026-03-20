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
    gap: "20px"
  },
  selectionsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "35%",
    margin: "0 auto",
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
  flowchart: {
    width: "60%"
  },
  highlighted: {
    backgroundColor: "#30f44aff"
  },
  minHighlight: {
    backgroundColor: "rgb(224, 253, 228)"
  },
  cfsTable: {
    border: "1px solid rgb(150,150,150)",
    width: "50%",
    borderRadius: "5px",
    overflow: "hidden"
  },
  durationsTable: {
    border: "1px solid rgb(150,150,150)",
    width: "75%",
    borderRadius: "5px",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    margin: "24px 0px"
  },
  label: {
    fontSize: "24px",
    textAlign: "center",
    margin: 0
  },
  tableHeader: {
    backgroundColor: "#fafafa"
  }
}));

export default function ChangeFactorSummary({ options, data }) {
  const classes = useStyles();

  let emissionsScenario;
  const percentiles = {
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



  const {median, "10%": _10, "90%": _90, "25%": _25, "75%": _75} = data[emissionsScenario][options.timePeriod][options.returnPeriod][options.station.fips];

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

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.flowchart}>
          <img width="100%" src={process.env.PUBLIC_URL + "/assets/original_change_factor_flowchart.jpg"} alt="Flowcharts that show how selected options alter risk orientation outcomes" />
        </div>

        <div className={ classes.selectionsContainer }>
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
            <p><b>Risk Exposure</b>:</p>
            <p>{capitalizeFirstLetter(options["riskOrientation"]["exposure"])}</p>
          </div>
          <div>
            <p><b>Risk Sensitivity</b>:</p>
            <p>{capitalizeFirstLetter(options["riskOrientation"]["sensitivity"])}</p>
          </div>
          <div>
            <p><b>Risk Capacity</b>:</p>
            <p>{capitalizeFirstLetter(options["riskOrientation"]["capacity"])}</p>
          </div>
          <div>
            <p><b>Risk Orientation</b>:</p>
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


      <div className={classes.tableContainer}>
        <p className={classes.label}>Your recommended Change Factors</p>
        <div className={classes.cfsTable}>
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
        </div>
      </div>

      <div className={classes.tableContainer}>
        <p className={classes.label}>Depths for {options.returnPeriod}-year Storm</p>

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
                    <TableCell className={determineHighlighting(isDuration, percentiles._90th)} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*_10).toFixed(2)}</TableCell>
                    <TableCell className={determineHighlighting(isDuration, percentiles._75th)} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*_25).toFixed(2)}</TableCell>
                    <TableCell className={determineHighlighting(isDuration, percentiles._median)} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*median).toFixed(2)}</TableCell>
                    <TableCell className={determineHighlighting(isDuration, percentiles._75th)} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*_75).toFixed(2)}</TableCell>
                    <TableCell className={determineHighlighting(isDuration, percentiles._90th, [classes.tableColRightBorder])} align="center">{(parseFloat(station[duration][`${options["returnPeriod"]}-mid`])*_90).toFixed(2)}</TableCell>
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
