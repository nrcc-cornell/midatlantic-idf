import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  // Modal,
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import CloseIcon from "@material-ui/icons/Close";
// import ReactGA from "react-ga4";

import Introduction from "./panels/Introduction";
import { siteGuidance } from "./SiteGuidance";

import { CurrentContext } from "../../contexts/CurrentContext";
import { DataContext } from "../../contexts/DataContext";
import { OptionsContext} from "../../contexts/OptionsContext";
import { ChartContext } from "../../contexts/ChartContext";

const useStyles = makeStyles(() => ({
// const useStyles = makeStyles((theme) => ({
  // paper: {
  //   position: "absolute",
  //   boxSizing: "border-box",
  //   minHeight: "478px",
  //   height: "calc(100vh - 100px)",
  //   maxHeight: "800px",
  //   minWidth: "984px",
  //   width: "calc(100vw - 40px)",
  //   maxWidth: "1400px",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%,-50%)",
  //   backgroundColor: theme.palette.background.paper,
  //   border: "none",
  //   borderRadius: "20px",
  //   boxShadow: theme.shadows[5],
  //   outline: "none",
  //   padding: "6px 12px 12px 12px",
  // },
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
    margin: "12px 0px 6px 0px",
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

const guidancePathways = [siteGuidance];

export default function Guidance({ handleClose }) {
  const { options:mapOptions, setOptions:setMapOptions } = useContext(OptionsContext);
  const chartContextObj = useContext(ChartContext);
  const currentContextObj = useContext(CurrentContext);
  const { stations, data } = useContext(DataContext);
  // const { stations, data, setDataSource } = useContext(DataContext);
  
  // const [open, setOpen] = useState(false);
  const [useCase, setUseCase] = useState("site");
  const [activePathway, setActivePathway] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const [options, setOptions] = useState(guidancePathways.reduce((obj,gp) => {
    return { ...obj, [gp.id]: JSON.parse(JSON.stringify(gp.optionsState)) };
  }, {}));

  const classes = useStyles();

  useEffect(() => {
    if (currentContextObj?.current && useCase && (!options[useCase]?.station || options[useCase]?.station && stations[currentContextObj.current].fips !== options[useCase].station.fips)) {
      handleOptionsChange("state", stations[currentContextObj.current].state);
      handleOptionsChange("station", stations[currentContextObj.current]);
    }
  }, [currentContextObj?.current]);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   ReactGA.event({
  //     action: "clicked",
  //     category: "modal",
  //     label: "guidance"
  //   });
  //   setOpen(true);
  // };

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
    setOptions((prevOptions) => {
      const newOptions = JSON.parse(JSON.stringify(prevOptions));
      newOptions[useCase][field] = value;
      return newOptions;
    });
  };

  const handleSetMapOptions = () => {
    if (useCase === "site" && chartContextObj?.setCurrent) {
      const newCurrent = Object.entries(stations).find((stn) => stn[1].station_name === options.site.station.station_name);
      chartContextObj.setCurrent(newCurrent[0]);

      // setDataSource(options.site.dateSource);

      setMapOptions({
        ...mapOptions,
        "emission": options.site.riskOrientation.riskOrientation === "averse" ? "8.5" : "4.5",
        "tp": options.site.timePeriod,
        "rp": String(options.site.returnPeriod)
      });
    }
    
    if (chartContextObj?.setChart) {
      chartContextObj.setChart(false);
    }
    handleClose();
  };

  const getHeading = (step, pathway) => {
    let headingText = "";
    if (step === 0) {
      headingText = "About this Guidance";
    } else if (pathway) {
      if (step === pathway.steps.length + 1) {
        headingText = "Change Factor Summary";
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
          selectedLocation={stations[chartContextObj?.current]}
          stations={stations}
        />
      );
    } else {
      return <Introduction nextFunction={() => handleSetUseCase("site")} />;
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div style={{ visibility: (useCase && activeStep > 0) ? "visible" : "hidden" }}>
          <Stepper alternativeLabel nonLinear activeStep={activeStep} classes={{ root: classes.compactStepper }}>
            <Step>
              <StepButton
                onClick={handleSetStep(0)}
                completed={true}
              >
                    Introduction
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
                          Change Factor Summary
                      </StepButton>
                    ) : (
                      <StepLabel>Change Factor Summary</StepLabel>
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
    </React.Fragment>
  );

  // return (
  //   <div style={{ marginTop: "28px" }}>
  //     <Button
  //       id="guidance-button"
  //       aria-label="open guidance modal"
  //       onClick={handleOpen}
  //       style={{ border: "1px solid rgb(80,80,80)" }}
  //     >
  //       Tool Guidance
  //     </Button>

  //     {/* <Button
  //       id="communication-guidance-button"
  //       // href="https://www.google.com" 
  //       target="_blank" 
  //       style={{
  //         border: "1px solid rgb(80,80,80)",
  //         marginTop: "6px"
  //       }}
  //     >
  //       Communication Guidance
  //     </Button> */}

  //     <Modal
  //       open={open}
  //       onClose={handleClose}
  //       aria-labelledby="guidance-title"
  //       aria-describedby="guidance-description"
  //     >
  //       <div className={classes.paper}>
  //         <div className="close-modal"><CloseIcon onClick={handleClose} /></div>

  //         <div className={classes.root}>
  //           <div style={{ visibility: (useCase && activeStep > 0) ? "visible" : "hidden" }}>
  //             <Stepper alternativeLabel nonLinear activeStep={activeStep} classes={{ root: classes.compactStepper }}>
  //               <Step>
  //                 <StepButton
  //                   onClick={handleSetStep(0)}
  //                   completed={true}
  //                 >
  //                   Introduction
  //                 </StepButton>
  //               </Step>
              
  //               {activePathway && activePathway.steps.map((label, index) => {
  //                 return (
  //                   <Step key={label}>
  //                     {activePathway.isStepComplete(index + 1, options[useCase]) ? (
  //                       <StepButton
  //                         onClick={handleSetStep(index + 1)}
  //                         completed={activePathway.isStepComplete(index + 2, options[useCase])}
  //                       >
  //                         {label}
  //                       </StepButton>
  //                     ) : (
  //                       <StepLabel>{label}</StepLabel>
  //                     )}
  //                   </Step>
  //                 );
  //               })}

  //               {activePathway &&
  //                 <Step>
  //                   {activePathway.isStepComplete(activePathway.steps.length + 2, options[useCase]) ? (
  //                     <StepButton
  //                       onClick={handleSetStep(activePathway.steps.length + 1)}
  //                       completed={true}
  //                     >
  //                         Change Factor Summary
  //                     </StepButton>
  //                   ) : (
  //                     <StepLabel>Change Factor Summary</StepLabel>
  //                   )}
  //                 </Step>
  //               }
  //             </Stepper>
  //           </div>

  //           <h2 className={classes.heading}>{getHeading(activeStep, activePathway)}</h2>
            
  //           <div className={classes.content}>
  //             {getContent(useCase, activeStep)}
  //           </div>

  //           <div className={classes.btnContainer}>
  //             {activeStep > 0 && 
  //               <Button onClick={handleBack} className={classes.button}>
  //                 Back
  //               </Button>
  //             }

  //             {(activePathway && activeStep > 0 && activeStep < activePathway.steps.length + 1) &&
  //               <Button
  //                 variant="contained"
  //                 color="primary"
  //                 onClick={handleNext}
  //                 className={classes.button}
  //                 disabled={!activePathway.isStepComplete(activeStep + 1, options[useCase])}
  //               >
  //                 Next
  //               </Button>
  //             }

  //             {(activePathway && activeStep === activePathway.steps.length + 1) &&
  //               <>
  //                 <Button
  //                   variant="contained"
  //                   color="secondary"
  //                   onClick={handleReset}
  //                 >
  //                   Reset
  //                 </Button>
  //                 <Button
  //                   variant="contained"
  //                   color="primary"
  //                   onClick={handleSetMapOptions}
  //                   className={classes.button}
  //                 >
  //                   See Selections on Map
  //                 </Button>
  //               </>
  //             }
  //           </div>
  //         </div>
  //       </div>
  //     </Modal>
  //   </div>
  // );
}

Guidance.propTypes = {
  handleClose: PropTypes.func
};