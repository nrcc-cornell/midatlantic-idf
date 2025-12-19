import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    gap: "24px"
  },
  btn: {
    width: "100%",
    padding: "16px 32px",
    fontWeight: "bold"
  },
}));

export default function UseCase({ guidancePathways, setUseCase }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={ classes.heading }>What are you trying to do?</h2>

      <div className={classes.btnContainer}>
        {guidancePathways.map(gp => {
          return (
            <Button
              key={gp.id}
              onClick={() => setUseCase(gp.id)}
              variant="contained"
              color="primary"
              className={ classes.btn }
            >
              {gp.selectionText}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

UseCase.propTypes = {
  setUseCase: PropTypes.func,
  guidancePathways: PropTypes.array,
};