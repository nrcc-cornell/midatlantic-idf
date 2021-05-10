import React, { useContext, useEffect, useState } from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

// import { data } from "../data";

import { OptionsContext } from "../contexts/OptionsContext";

import "../styles/Legend.scss";

export default function Legend() {
  const {options: {emission, rp, tp}} = useContext(OptionsContext);

  const [isShown, setIsShown] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  
  useEffect(() => {
    // const currentData = data[emission][tp][rp];
  
    // let tempMax = Math.ceil(currentData.max*100)/100;
    // let tempMin = Math.floor(currentData.min*100)/100;
  
    // setMax(Math.round((1+Math.max(tempMax-1, 1-tempMin))*100)/100);
    // setMin(Math.round((1-Math.max(tempMax-1, 1-tempMin))*100)/100);
    setMin(0.7);
    setMax(1.30);
  }, [emission, tp, rp]);
  
  return (
    <div className="legend-controls-container">
      <div id="legend-wrapper">
        <div id="legend">
          <div id="legend-color" style={{
            // backgroundImage: "linear-gradient(270deg,hsla(110, 100%, 0%, 1), hsla(110, 75%, 50%, 1) 40%, hsla(110,50%,90%,1) 50%, hsla(40, 100%, 70%, 1))"
            backgroundImage: "linear-gradient(90deg, rgba(255,205,100,1) 0%, rgba(255,255,255,1) 50%, rgba(65,225,30,1) 52%, rgba(35,105,30,1) 67%, rgba(35,40,225,1) 100%)"
          }}>
          </div>
        </div>
        <div id="legend-units">
          <div id="legend-title">
            <span>Median County Change Factor</span>
            <div id="cf-definition"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <HelpOutlineIcon />
              {isShown && <div id="cf-definition-popper">The Change Factor is the ratio between future and historic IDF curve values and represents the change we anticipate in the magnitude of precipitation events. A change factor of 1.0 indicates no change between historic and future conditions.</div>}
            </div>
          </div>
          <div className="legend-text">{min}</div>
          <div className="legend-text">1.0</div>
          <div className="legend-text">{max}</div>
        </div>
      </div>
      
      <div id="legend-lines">
        <div className="legend-item">
          <div className="line-wrapper">
            <div id="line-cbw"></div>
          </div>
          <div id="line-label">Watershed Boundary</div>
        </div>
        <div className="legend-item">
          <div className="line-wrapper">
            <div id="line-state"></div>
          </div>
          <div id="line-label">State Border</div>
        </div>
      </div>
    </div>
  );
}