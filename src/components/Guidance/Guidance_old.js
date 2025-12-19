import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import ReactGA from "react-ga4";

import { CurrentContext } from "../../contexts/CurrentContext";
import { DataContext } from "../../contexts/DataContext";
import {OptionsContext} from "../../contexts/OptionsContext";
import { ChartContext } from "../../contexts/ChartContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "120px",
    bottom: "130px",
    left: "20px",
    right: "20px",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    outline: "none",
    padding: "12px 32px"
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  stepContent: {
    flex: 1
  },
  review: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  }
}));

const selectors = [{
  id: "tp",
  width: "200px",
  label: "Time Period",
  items: [
    ["2020-2070","2020-2070"],
    ["2050-2100","2050-2100"],
  ]
},{
  id: "rp",
  width: "200px",
  label: "Return Period",
  items: [
    ["2","2-year"],
    ["5","5-year"],
    ["10","10-year"],
    ["25","25-year"],
    ["50","50-year"],
    ["100","100-year"],
  ]
},{
  id: "es",
  width: "200px",
  label: "Emissions Scenario",
  items: [
    ["8.5","High RCP 8.5"],
    ["4.5","Low RCP 4.5"],
  ]
},{
  id: "ds",
  width: "200px",
  label: "Data Source",
  items: [
    ["data1","Data Source 1"],
    ["data2","Data Source 2"],
  ]
}];

function Selector({ id, width, options, handleOptionsChange, index, items, label }) {
  return (
    <FormControl style={{ width: width }}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        displayEmpty
        value={options[index]}
        onChange={event => handleOptionsChange(index, event.target.value)}
        variant="standard"
      >
        {items.map(([value,label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

Selector.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleOptionsChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired
};

export default function Guidance() {
  const { setOptions:setMapOptions } = useContext(OptionsContext);
  const { current } = useContext(CurrentContext);
  const { stations, data, setDataSource } = useContext(DataContext);
  const {setChart} = useContext(ChartContext);
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [options, setOptions] = useState(["","","",""]);
  const classes = useStyles();
  const steps = [
    "Select Time Period",
    "Select Return Period",
    "Select Emissions Scenario",
    "Select Data Source",
    "Review",
    "Results"
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    ReactGA.event({
      action: "clicked",
      category: "modal",
      label: "guidance"
    });
    setOpen(true);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSetStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setOptions(["","","",""]);
  };

  function handleOptionsChange(field, value) {
    const newOptions = [...options];
    newOptions[field] = value;
    setOptions(newOptions);
  }

  function handleSetMapOptions() {
    setDataSource(options[3]);
    setMapOptions({
      "emission": options[2],
      "tp": options[0],
      "rp": options[1],
      "area": "both"
    });
    setChart(false);
    handleClose();
  }

  function getStepContent(step) {
    switch (step) {
    case 0:
      return (
        <div>
          <h2>Step 1: Select a Time Period</h2>
          <Selector {...selectors[step]} index={step} options={options} handleOptionsChange={handleOptionsChange} />
        </div>
      );
    case 1:
      return (
        <div>
          <h2>Step 2: Select a Return Period</h2>
          <Selector {...selectors[step]} index={step} options={options} handleOptionsChange={handleOptionsChange} />
        </div>
      );
    case 2:
      return (
        <div>
          <h2>Step 3: Select an Emissions Scenario</h2>
          <Selector {...selectors[step]} index={step} options={options} handleOptionsChange={handleOptionsChange} />
        </div>
      );
    case 3:
      return (
        <div>
          <h2>Step 4: Select a Data Source</h2>
          <Selector {...selectors[step]} index={step} options={options} handleOptionsChange={handleOptionsChange} />
        </div>
      );
    case 4:
      return (
        <div>
          <h2>Review</h2>
          <div className={classes.review}>
            <Selector {...selectors[0]} index={0} options={options} handleOptionsChange={handleOptionsChange} />
            <Selector {...selectors[1]} index={1} options={options} handleOptionsChange={handleOptionsChange} />
            <Selector {...selectors[2]} index={2} options={options} handleOptionsChange={handleOptionsChange} />
            <Selector {...selectors[3]} index={3} options={options} handleOptionsChange={handleOptionsChange} />
          </div>
        </div>
      );
    case 5:
      try {
        const {name, median, "10%": _10, "90%": _90, "25%": _25, "75%": _75} = data[options[2]][options[0]][options[1]][stations[current]["fips"]];

        return (
          <div>
            <h2>Results</h2>
            <div>
              <p>County: {name}</p>
              <p>10%: {_10}</p>
              <p>25%: {_25}</p>
              <p>Median: {median}</p>
              <p>75%: {_75}</p>
              <p>90%: {_90}</p>
            </div>
          </div>
        );
      } catch (error) {
        return (
          <div>
            <h2>Results</h2>
            <p>There was a problem finding the requested data. Please try again, try a different location, or try a different combination of options.</p>
          </div>
        );
      }
    default:
      return "Unknown step";
    }
  }

  return (
    <div style={{ marginTop: "8px" }}>
      <Button
        id="guidance-button"
        aria-label="open guidance modal"
        disabled={!current}
        onClick={handleOpen}
        style={{
          border: current ? "1px solid rgb(80,80,80)" : "1px solid rgb(200,200,200)",
        }}
      >
        Show Guidance
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="guidance-title"
        aria-describedby="guidance-description"
      >
        <div className={classes.paper}>
          <div className="close-modal"><CloseIcon onClick={handleClose} /></div>

          <div className={classes.root}>
            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    {(index > 4 && options.includes("")) ? (
                      <StepLabel>{label}</StepLabel>
                    ) : (
                      <StepButton
                        onClick={handleSetStep(index)}
                        completed={index > 3 ? false : options[index] !== ""}
                      >
                        {label}
                      </StepButton>
                    )}
                  </Step>
                );
              })}
            </Stepper>
            <div className={classes.contentWrapper}>
              <div className={classes.stepContent}>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              </div>  
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                </Button>
                {activeStep === 4 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={options.includes("")}
                  >
                      Get Results for {(current && stations) ? `${stations[current]["station_name"]}, ${stations[current]["state"]}` : "Unknown"}
                  </Button>
                ) : (activeStep === 5 ? ("") : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                      Next
                  </Button>
                )
                )}
                {(activeStep === 4 || activeStep === 5) && 
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSetMapOptions}
                      className={classes.button}
                      disabled={options.includes("")}
                    >See Selections on Map</Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleReset}
                    >Reset</Button>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}