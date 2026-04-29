import React from "react";
import PropTypes from "prop-types";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  mainContainer: {
    padding: "0px 24px"
  },
  selectorsContainer: {
    paddingLeft: "50px",
    gap: "30px",
    margin: "30px 0px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-end",
    width: "fit-content"
  },
  selector: {
    padding: "6px 12px",
    border: "1px solid rgb(220,220,220)",
    borderRadius: "5px"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    marginTop: "24px"
  },
  btn: {
    padding: "16px 32px",
    fontWeight: "bold"
  },
  endnote: {
    fontStyle: "italic",
    textAlign: "center"
  },
  selectText: {
    margin: 0,
    fontWeight: "bold"
  },
  select: {
    marginLeft: "24px",
    minWidth: "150px"
  },
  multiSelect: {
    display: "flex",
    gap: "24px"
  }
}));

const returnPeriodOptions = [
  { value: 2, label: "2-year" },
  { value: 5, label: "5-year" },
  { value: 10, label: "10-year" },
  { value: 25, label: "25-year" },
  { value: 50, label: "50-year" },
  { value: 100, label: "100-year" },
];

const durationOptions = [
  { value: "5min", label: "5 min"},
  { value: "10min", label: "10 min"},
  { value: "15min", label: "15 min"},
  { value: "30min", label: "30 min"},
  { value: "60min", label: "60 min"},
  { value: "2hr", label: "2 hr"},
  { value: "3hr", label: "3 hr"},
  { value: "6hr", label: "6 hr"},
  { value: "12hr", label: "12 hr"},
  { value: "24hr", label: "24 hr"},
  { value: "2day", label: "2 day"},
  { value: "3day", label: "3 day"},
  { value: "4day", label: "4 day"},
  { value: "7day", label: "7 day"},
];

export default function UserSelections({ options, handleOptionsChange, stations }) {
  const classes = useStyles();

  const stationOptions = Object.entries(stations).reduce((acc, [stnKey, stnObj]) => {
    if (!Object.keys(acc).includes(stnObj.state)) {
      acc[stnObj.state] = [];
    }
    
    acc[stnObj.state].push({
      station_name: stnObj.station_name,
      state: stnObj.state,
      key: stnKey
    });

    acc[stnObj.state].sort((a,b) => a.station_name.localeCompare(b.station_name));
    
    return acc;
  }, {});

  const handleStateChange = (e) => {
    handleOptionsChange("state", e.target.value);
  };

  const handleStationChange = (e) => {
    handleOptionsChange("station", Object.values(stations).find(obj => obj.station_name === e.target.value));
  };

  const handleReturnPeriodChange = (e) => {
    handleOptionsChange("returnPeriod", e.target.value);
  };

  const handleDurationChange = (e) => {
    handleOptionsChange("duration", e.target.value);
  };

  return (
    <div className={ classes.mainContainer }>
      <p>Please make the following selections first. These choices are typically based in local policy and/or are specific to a jurisdiction or project.</p>

      <div className={ classes.selectorsContainer }>
        <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
          <p className={ classes.selectText }>Select a Station within the Chesapeake Bay watershed or Virginia:</p>
          
          <div className={ classes.multiSelect }>
            <FormControl>
              <InputLabel shrink id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                value={options["state"] || ""}
                onChange={handleStateChange}
                className={ classes.select }
              >
                {Object.keys(stationOptions).toSorted().map((stateAbbr) => <MenuItem key={stateAbbr} value={stateAbbr}>{stateAbbr}</MenuItem>)}
              </Select>
            </FormControl>
            
            <FormControl>
              <InputLabel shrink id="station-label">Station</InputLabel>
              <Select
                labelId="station-label"
                disabled={options["state"] === undefined}
                value={options["station"]?.station_name || ""}
                onChange={handleStationChange}
                className={ classes.select }
              >
                {(options["state"] ? stationOptions[options["state"]] : []).map((obj, i) => <MenuItem key={obj.station_name + i} value={obj.station_name}>{obj.station_name}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
          <p className={ classes.selectText }>Select a Return Period:</p>
        
          <Select
            value={options["returnPeriod"]}
            onChange={handleReturnPeriodChange}
            className={ classes.select }
          >
            {returnPeriodOptions.map(({ value, label}) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </Select>
        </div>

        <div className={ classes.selector } style={{ maxWidth: "1000px" }}>
          <p className={ classes.selectText }>Select a Duration:</p>
        
          <Select
            value={options["duration"]}
            onChange={handleDurationChange}
            className={ classes.select }
          >
            {durationOptions.map(({ value, label}) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </Select>
        </div>
      </div>

      <p className={ classes.endnote }>Refer to pages 10-11 of the <a href="https://www.rand.org/pubs/tools/TLA4308-2.html" rel="noreferrer" target="_blank">decision support guide</a> for more details on these choices.</p>
    </div>
  );
}

UserSelections.propTypes = {
  options: PropTypes.object,
  handleOptionsChange: PropTypes.func,
  stations: PropTypes.object
};