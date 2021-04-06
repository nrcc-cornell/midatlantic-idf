import React, { useContext, useEffect, useState } from "react";

import { data } from "../data";

import { OptionsContext } from "../contexts/OptionsContext";

import "../styles/Legend.scss";

export default function Legend() {
  const {options: {emission, rp, tp}} = useContext(OptionsContext);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  
  useEffect(() => {
    const currentData = data[emission][tp][rp];
  
    let tempMax = Math.ceil(currentData.max*10)/10;
    let tempMin = Math.floor(currentData.min*10)/10;
  
    setMax(Math.round((1+Math.max(tempMax-1, 1-tempMin))*10)/10);
    setMin(Math.round((1-Math.max(tempMax-1, 1-tempMin))*10)/10);
  }, [emission, tp, rp]);
  
  return (
    <div className="legend-controls-container">
      <div id="legend">
        <div id="legend-color" style={{
          backgroundImage: "linear-gradient(270deg,hsla(110, 100%, 0%, 1), hsla(110, 75%, 50%, 1) 40%, hsla(110,50%,90%,1) 50%, hsla(40, 100%, 70%, 1))"
        }}>
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