import {useContext, useState} from 'react'

import {
  Button,
  FormControl,
  // FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  // Switch,
  Typography,
  Input,
  FormHelperText
} from '@material-ui/core'

// import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
// import Grid from '@material-ui/core/Grid';


import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import {OptionsContext} from '../contexts/OptionsContext'
import {ChartContext} from '../contexts/ChartContext'
import {CurrentContext} from '../contexts/CurrentContext'

import '../styles/Options.scss'

// const DataSwitch = withStyles({
//   switchBase: {
//     transition: 'all .5s',
//     color: green[500],
//     '&$checked': {
//       color: green[500],
//     },
//     '&$checked + $track': {
//       backgroundColor: green[500],
//     },
//   },
//   checked: {},
//   track: {backgroundColor: green[500]},
// })(Switch);

function Options() {
  // const [vaScope, setVAScope] = useState(false);

  const {options, setOptions} = useContext(OptionsContext)
  const {chart, setChart} = useContext(ChartContext)
  const {current} = useContext(CurrentContext)

  
  const handleChange = (event, field) => {
    let newOptions = {...options}
    newOptions[field] = event.target.value
    setOptions(newOptions)
  }

  // const handleToggle = (event) => {
  //   // Also fly to new viewport and filter down data
  //   setVAScope(event.target.checked);
  // };

  return (
    <div id="options-cont" className="card">
      <Typography variant="h5" component = "h2">
        Selection Panel
      </Typography>
      <FormGroup id="input-cont">
        <FormControl>
          <InputLabel id="rp">
            Return Period
          </InputLabel>
          <Select
            labelId="rp"
            displayEmpty
            value={options['rp']}
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
        <FormControl>
          <InputLabel id="es" shrink>
            Emission Scenario
          </InputLabel>
          <Select
            labelId="es"
            displayEmpty
            value={options['emission']}
            onChange={event => handleChange(event, "emission")}
          >
            <MenuItem value={8.5}>High RCP 8.5</MenuItem>
            <MenuItem value={4.5}>Low RCP 4.5</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="tp">
            Time Period
          </InputLabel>
          <Select
            labelId="tp"
            displayEmpty
            value={options['tp']}
            onChange={event => handleChange(event, "tp")}
          >
            <MenuItem value={"2020-2070"}>2020-2070</MenuItem>
            <MenuItem value={"2050-2100"}>2050-2100</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="aoc">
            Area of Concern
          </InputLabel>
          <Select
            labelId="aoc"
            displayEmpty
            value={options['area']}
            onChange={event => handleChange(event, "area")}
          >
            <MenuItem value={"both"}>Both</MenuItem>
            <MenuItem value={"bay"}>Chesapeake Bay Watershed</MenuItem>
            <MenuItem value={"virginia"}>Virginia</MenuItem>
          </Select>
        </FormControl>
        
        {/* <div id="switch-container"> */}
          {/* <div className="switch-label">Chesapeake Bay</div>
          <FormControlLabel
            control={
              <Switch
              checked={vaScope}
              onChange={handleToggle}
              name="scopeFilter"
              color="rgb(255, 0, 0)"
              />
            }
          />
          <div className="switch-label">Virginia</div> */}

          {/* <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item><div className="switch-label">Chesapeake Bay</div></Grid>
            <Grid item>
              <DataSwitch checked={vaScope} onChange={handleToggle} name="ScopeFilter" />
            </Grid>
            <Grid item><div className="switch-label">Virginia</div></Grid>
          </Grid> */}
        {/* </div> */}
      </FormGroup>
      <Button
        id="chart-toggle"
        aria-label="toggle chart visibility"
        disabled={!current}
        onClick={() => setChart(!chart)}
        endIcon= {chart ? <VisibilityOffIcon/> : <VisibilityIcon/>}
      >
        {`Chart ${chart ? 'Off' : 'On'}`}
      </Button>
    </div>
  )
}

export default Options