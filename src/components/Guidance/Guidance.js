import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import ReactGA from "react-ga4";

import UseCase from "./UseCase";
import { siteGuidance } from "./SiteGuidance";
import { riskGuidance } from "./RiskGuidance";
import { policyGuidance } from "./PolicyGuidance";

import { CurrentContext } from "../../contexts/CurrentContext";
import { DataContext } from "../../contexts/DataContext";
import { OptionsContext} from "../../contexts/OptionsContext";
import { ChartContext } from "../../contexts/ChartContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    boxSizing: "border-box",
    minHeight: "478px",
    height: "calc(100vh - 100px)",
    maxHeight: "800px",
    minWidth: "984px",
    width: "calc(100vw - 40px)",
    maxWidth: "1400px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    outline: "none",
    padding: "6px 12px 12px 12px",
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: 1,
    marginBottom: "12px",
    overflowY: "auto",
    border: "1px solid rgb(230,230,230)",
    padding: "6px",
    boxShadow: "inset 0px 0px 5px rgba(150,150,150, 0.3)"
  },
  heading: {
    margin: "0px",
    textAlign: "center"
  },
  compactStepper: {
    paddingTop: "0px",
    paddingBottom: "0px"
  },
  btnContainer: {
    minHeight: "37px",
    display: "flex",
    gap: "6px",
  }
}));

const guidancePathways = [siteGuidance, riskGuidance, policyGuidance];

export default function Guidance() {
  const { setOptions:setMapOptions } = useContext(OptionsContext);
  const {setChart} = useContext(ChartContext);
  const { current } = useContext(CurrentContext);
  const { stations, data, setDataSource } = useContext(DataContext);
  
  const [open, setOpen] = useState(false);
  const [useCase, setUseCase] = useState("");
  const [activePathway, setActivePathway] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const [options, setOptions] = useState(guidancePathways.reduce((obj,gp) => {
    return { ...obj, [gp.id]: JSON.parse(JSON.stringify(gp.optionsState)) };
  }, {}));

  const classes = useStyles();

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
    setActiveStep(1);
    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        [useCase]: activePathway ? JSON.parse(JSON.stringify(activePathway.optionsState)) : {}
      };
    });
  };

  const handleSetUseCase = (newUseCase) => {
    setUseCase(newUseCase);
    setActivePathway(guidancePathways.find(gp => gp.id === newUseCase));
    setActiveStep(1);
  };

  const handleOptionsChange = (field, value) => {
    console.log(field, value, useCase);
    setOptions((prevOptions) => {
      const newOptions = JSON.parse(JSON.stringify(prevOptions));
      newOptions[useCase][field] = value;
      return newOptions;
    });
  };

  const handleSetMapOptions = () => {
    if (useCase === "site") {
      setDataSource(options.site.dateSource);
      setMapOptions((prevMapOptions) => {
        return {
          "emission": parseFloat(options.site.emissionsScenario),
          "tp": options.site.timePeriod,
          "rp": prevMapOptions.rp,
          "area": prevMapOptions.area
        };
      });
    }
    
    setChart(false);
    handleClose();
  };

  const getHeading = (step, pathway) => {
    let headingText = `Step ${step + 1}: `;
    if (step === 0) {
      headingText += "Selecting your use case";
    } else if (pathway) {
      if (step === pathway.steps.length + 1) {
        headingText = "Summary of results";
      } else {
        headingText += pathway.steps[step - 1];
      }
    }
    return headingText;
  };
  
  const getContent = (useCase, activeStep) => {
    if (activePathway && activeStep > 0) {
      const Content = activePathway.component;
      return (
        <Content
          activeStep={activeStep}
          options={options[useCase]}
          handleOptionsChange={handleOptionsChange}
          data={data}
          selectedLocation={stations[current]}
        />
      );
    } else {
      return <UseCase guidancePathways={guidancePathways} setUseCase={handleSetUseCase} />;
    }
  };

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
        Tool Guidance
      </Button>

      <Button
        id="communication-guidance-button"
        href="https://www.google.com" 
        target="_blank" 
        style={{
          border: "1px solid rgb(80,80,80)",
          marginTop: "6px"
        }}
      >
        Communication Guidance
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
            <div style={{ visibility: (useCase && activeStep > 0) ? "visible" : "hidden" }}>
              <Stepper alternativeLabel nonLinear activeStep={activeStep} classes={{ root: classes.compactStepper }}>
                <Step>
                  <StepButton
                    onClick={handleSetStep(0)}
                    completed={true}
                  >
                    Selecting your use case
                  </StepButton>
                </Step>
              
                {activePathway && activePathway.steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      {activePathway.isStepComplete(index + 1, options[useCase]) ? (
                        <StepButton
                          onClick={handleSetStep(index + 1)}
                          completed={activePathway.isStepComplete(index + 2, options[useCase])}
                        >
                          {label}
                        </StepButton>
                      ) : (
                        <StepLabel>{label}</StepLabel>
                      )}
                    </Step>
                  );
                })}

                {activePathway &&
                  <Step>
                    {activePathway.isStepComplete(activePathway.steps.length + 2, options[useCase]) ? (
                      <StepButton
                        onClick={handleSetStep(activePathway.steps.length + 1)}
                        completed={true}
                      >
                          Summary of results
                      </StepButton>
                    ) : (
                      <StepLabel>Summary of results</StepLabel>
                    )}
                  </Step>
                }
              </Stepper>
            </div>

            <h2 className={classes.heading}>{getHeading(activeStep, activePathway)}</h2>
            
            <div className={classes.content}>
              {getContent(useCase, activeStep)}
            </div>

            <div className={classes.btnContainer}>
              {activeStep > 0 && 
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              }

              {(activePathway && activeStep > 0 && activeStep < activePathway.steps.length + 1) &&
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={!activePathway.isStepComplete(activeStep + 1, options[useCase])}
                >
                  Next
                </Button>
              }

              {(activePathway && activeStep === activePathway.steps.length + 1) &&
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSetMapOptions}
                    className={classes.button}
                  >
                    See Selections on Map
                  </Button>
                </>
              }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}