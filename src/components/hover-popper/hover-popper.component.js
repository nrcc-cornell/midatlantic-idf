import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Popper, Fade } from "@material-ui/core";

import { ReactComponent as InfoIcon } from "./infoIcon.svg";
import "./hover-popper.styles.css";

export default function HoverPopper({ popperText, children=[<InfoIcon key="info-icon" style={{ pointerEvents: "none" }} height="24" width="24" />] }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseOver = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const handleMouseOut = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <div className="hover-popper-trigger" aria-describedby="hover-popper" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >{children}</div>
      <Popper id="hover-popper" open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={150}>
            <Box className="hover-popper-text">
              {popperText}
            </Box>
          </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
}

HoverPopper.propTypes = {
  popperText: PropTypes.string,
  children: PropTypes.node
};


// EXAMPLE USAGE

// import React from 'react';

// import HoverPopper from './components/hover-popper/hover-popper.component';

// const poppers = {
//   'normal': {
//     hover: 'Text to hover',
//     popperText: 'Text in popper'
//   },
//   'icon': {
//     hover: undefined,
//     popperText: 'Icon text'
//   }
// }

// export default function App() {
//   return (
//     <div>
//       {Object.values(poppers).map(({ hover, popperText }, i) => <HoverPopper key={i} popperText={popperText}>{hover}</HoverPopper>)}
//     </div>
//   );
// }