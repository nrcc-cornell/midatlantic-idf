import React, { useContext } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
  Switch
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";

import "../styles/Options.scss";

import {OptionsContext} from "../contexts/OptionsContext";
import {ChartContext} from "../contexts/ChartContext";
import {CurrentContext} from "../contexts/CurrentContext";
import { DataContext } from "../contexts/DataContext";

const useStyles = makeStyles(() => ({
  switch: {
    "& > .MuiSwitch-track": {
      backgroundColor: "#0e8a09",
    },
    "& > :not(.Mui-checked) > span > .MuiSwitch-thumb": {
      color: "#0e8a09",
    },
  },
}));

function Options() {
  const {options, setOptions} = useContext(OptionsContext);
  const {chart, setChart} = useContext(ChartContext);
  const {current} = useContext(CurrentContext);
  // const { dataSource } = useContext(DataContext);
  const { dataSource, dataSources, setDataSource } = useContext(DataContext);

  const classes = useStyles();

  const handleChange = (event, field) => {
    let newOptions = {...options};
    newOptions[field] = event.target.value;
    setOptions(newOptions);
  };

  return (
    <div id="options-cont" className="card">
      <Typography variant="h5" component = "h2">
        Manual Selection Panel
      </Typography>

      <FormGroup id="input-cont">
        <FormControl>
          <InputLabel id="rp">
            Return Period
          </InputLabel>
          <Select
            labelId="rp"
            displayEmpty
            value={options["rp"]}
            onChange={event => handleChange(event, "rp")}
          >
            <MenuItem value={2}>2-year</MenuItem>
            <MenuItem value={5}>5-year</MenuItem>
            <MenuItem value={10}>10-year</MenuItem>
            <MenuItem value={25}>25-year</MenuItem>
            <MenuItem value={50}>50-year</MenuItem>
            <MenuItem value={100}>100-year</MenuItem>
          </Select>
        </FormControl>

        {dataSource === "cmip5" ? (
          <FormControl>
            <InputLabel id="es" shrink>
              Emissions Scenario
            </InputLabel>
            <Select
              labelId="es"
              displayEmpty
              value={options["emission"]}
              onChange={event => handleChange(event, "emission")}
            >
              <MenuItem value={8.5}>RCP 8.5</MenuItem>
              <MenuItem value={4.5}>RCP 4.5</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <FormControl>
            <InputLabel id="es" shrink>
              Emissions Scenario
            </InputLabel>
            <Select
              labelId="es"
              displayEmpty
              value={options["emission"]}
              onChange={event => handleChange(event, "emission")}
            >
              <MenuItem value={"585"}>High SSP 585</MenuItem>
              <MenuItem value={"370"}>Medium SSP 370</MenuItem>
              <MenuItem value={"245"}>Low SSP 245</MenuItem>
            </Select>
          </FormControl>
        )}

        <FormControl>
          <InputLabel id="tp">
            Time Period
          </InputLabel>
          <Select
            labelId="tp"
            displayEmpty
            value={options["tp"]}
            onChange={event => handleChange(event, "tp")}
          >
            <MenuItem value={"2020-2070"}>2020-2070</MenuItem>
            <MenuItem value={"2050-2100"}>2050-2100</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="aoc">
            Area of Interest
          </InputLabel>
          <Select
            labelId="aoc"
            displayEmpty
            value={options["area"]}
            onChange={event => handleChange(event, "area")}
          >
            <MenuItem value={"both"}>Both</MenuItem>
            <MenuItem value={"bay"}>Chesapeake Bay Watershed</MenuItem>
            <MenuItem value={"virginia"}>Virginia</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>

      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1} style={{ marginTop: "6px" }}>
          <Grid item style={{ fontSize: "12px", width: "75px", textAlign: "center" }}>2026 Analysis</Grid>
          <Grid item>
            <Switch
              checked={dataSource !== dataSources[0]}
              onChange={() => setDataSource(dataSource === dataSources[0] ? dataSources[1] : dataSources[0])}
              name="Data Source"
              className={classes.switch}
            />
          </Grid>
          <Grid item style={{ fontSize: "12px", width: "75px", textAlign: "center" }}>2021 Analysis</Grid>
        </Grid>
      </Typography>

      <Button
        id="chart-toggle"
        aria-label="toggle chart visibility"
        disabled={!current}
        onClick={() => setChart(!chart)}
        endIcon= {chart ? <VisibilityOffIcon/> : <VisibilityIcon/>}
      >
        {`Chart ${chart ? "Off" : "On"}`}
      </Button>
    </div>
  );
}

export default Options;