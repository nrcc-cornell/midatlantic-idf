import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "60%"
  },
  heading: {
    marginTop: "0px",
    marginBottom: "30px"
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
  indentedParagraph: {
    textIndent: "18px"
  }
}));

export default function Introduction({ nextFunction }) {
  const classes = useStyles();

  return (
    <div className={ classes.container }>
      <p className={ classes.indentedParagraph }>This tool is an interactive companion to <i>Decision Support for Selecting Projected Intensity-Duration-Frequency Curvey Change Factors – A Guide for Stormwater Professionals</i>, a guide designed to help stormwater professionals make structured, transparent decisions about which projected change factors to use in design, planning, and policy. The full guide walks through three steps: determining the purpose and context of the work, selecting a risk orientation, and selecting a change factor. Rather than prescribing a single &quot;correct&quot; factor, it explains the reasoning that supports different choices, recognizing that the right choice depends on each user&apos;s context, goals, and risk orientation.</p>
      <p className={ classes.indentedParagraph }>This tool focuses on Steps 2 and 3. Before using it, users should consult the full guide to complete Step 1 which helps you identify the purpose of the work (e.g., designing infrastructure, assessing vulnerability, updating policy) and clarify what outcomes matter most. That context will inform the selections you make here.</p>
      <p className={ classes.indentedParagraph }>Once you are ready to proceed, the tool will guide you through a series of questions about the asset, system, or jurisdiction you are working with, including its exposure, sensitivity, and adaptive capacity. Your responses will determine an appropriate risk orientation and, ultimately, a recommended change factor specifying the time period, emissions scenario, and percentile that should inform your planning or design. At the end of the tool, you will receive a summary of your inputs and decisions alongside your recommended change factor.</p>
      <p className={ classes.indentedParagraph }>A more detailed version of this guidance, which can be used as a companion to this interactive tool is available here: COMING SOON</p>

      <div className={ classes.btnContainer }>
        <Button
          onClick={ nextFunction }
          variant="contained"
          color="primary"
          className={ classes.btn }
        >
          Begin Guidance
        </Button>
      </div>
    </div>
  );
}

Introduction.propTypes = {
  nextFunction: PropTypes.func,
};