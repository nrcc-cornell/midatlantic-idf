import React, { useContext } from 'react';
import { NavigationControl } from 'react-map-gl'
import { OptionsContext } from '../contexts/OptionsContext';
import { data } from '../data';
import "../styles/Legend.scss";


export default function Legend() {
  const {options: {emission, rp, tp}} = useContext(OptionsContext)
  const currentData = data[emission][tp][rp]

  let max = Math.ceil(currentData.max*10)/10;
  let min = Math.floor(currentData.min*10)/10;

  max = Math.round((1+Math.max(max-1, 1-min))*10)/10;
  min = Math.round((1-Math.max(max-1, 1-min))*10)/10;
  
  return (
    <div className="legend-controls-container">
      <div id="legend">
        <div id="legend-color" style={{
          backgroundImage: `linear-gradient(270deg,hsla(110, 100%, 0%, 1), hsla(110, 75%, 50%, 1) 40%, hsla(110,50%,90%,1) 50%, hsla(40, 100%, 70%, 1))`
          // backgroundImage: `linear-gradient(270deg, hsla(110, 100%, 0%, 1), hsla(110, 75%, 50%, 1), hsla(40, 100%, 70%, 1))`
          // backgroundImage: `linear-gradient(270deg, hsla(110, 100%, 0%, 1), hsla(110, 75%, 50%, 1))`
          // backgroundImage: `linear-gradient(270deg, hsla(160, 100%, 70%, 1), hsla(100, 0%, 40%, 1), hsla(40, 100%, 70%, 1))`
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
      <NavigationControl className="map-nav" showCompass={false} />
    </div>
  );
}