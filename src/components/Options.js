import {useContext} from 'react'

import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography
} from '@material-ui/core'


import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import {OptionsContext} from '../contexts/OptionsContext'
import {ChartContext} from '../contexts/ChartContext'
import {CurrentContext} from '../contexts/CurrentContext'

import '../styles/Options.scss'

function Options() {

  const {options, setOptions} = useContext(OptionsContext)
  const {chart, setChart} = useContext(ChartContext)
  const {current} = useContext(CurrentContext)
  
  const handleChange = (event, field) => {
    let newOptions = {...options}
    newOptions[field] = event.target.value
    setOptions(newOptions)
  }

  return (
    <div id="options-cont" className="card">
      <Typography variant="h5" component = "h2">
        Options
      </Typography>
      <FormGroup id="input-cont">
        <FormControl>
          <InputLabel>
            Return Period
          </InputLabel>
          <Select
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
          <InputLabel shrink>
            Emission Scenario
          </InputLabel>
          <Select
            displayEmpty
            value={options['emission']}
            onChange={event => handleChange(event, "emission")}
          >
            <MenuItem value={8.5}>High RCP 8.5</MenuItem>
            <MenuItem value={4.5}>Low RCP 4.5</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>
            Time Period
          </InputLabel>
          <Select
            displayEmpty
            value={options['tp']}
            onChange={event => handleChange(event, "tp")}
          >
            <MenuItem value={"2020-2070"}>2020-2070</MenuItem>
            <MenuItem value={"2050-2100"}>2050-2100</MenuItem>
          </Select>
        </FormControl>
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