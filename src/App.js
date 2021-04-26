import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

import "./styles/App.scss";

import Chart from "./components/Chart";
import Map from "./components/Map";
import Options from "./components/Options";
import Favorites from "./components/Favorites";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { OptionsContext } from "./contexts/OptionsContext";
import { ChartContext } from "./contexts/ChartContext";
import { CurrentContext } from "./contexts/CurrentContext";

import { useCurrentHeight, useCurrentWidth } from "./hooks/WindowSize";

function App() {
  const [options, setOptions] = useState({"emission": "4.5", "tp": "2020-2070", "rp": "2", "area": "both"});
  const [chart, setChart] = useState(false);
  const [current, setCurrent] = useState(null);
  const [windowSize, setWindowSize] = useState({height: true, width: true});
  const [warning, setWarning] = useState(true);

  let width = useCurrentWidth();
  let height = useCurrentHeight();

  useEffect(() => {
    setWindowSize({height: (height > 650), width: (width > 1000)});
  }, [height, width]);

  return (
    <div className="App">
      <Header />
      <div className="content" id="content">
        <OptionsContext.Provider value={{options, setOptions}}>
          <ChartContext.Provider value={{chart, setChart}}>
            <CurrentContext.Provider value={{current, setCurrent}}>
        
              <Map />
              <div id="grid">
                {warning && (!windowSize.height || !windowSize.width) && <div id="screen-warning">
                  <div id="warning">Warning</div>
                  <div id="warning-text">This app was designed for use with desktop displays. For a better user experience, please increase the {windowSize.height ? "width" : (windowSize.width ? "height" : "height and width")} of your browser window or view on a larger screen.</div>
                  <div id="warning-close"><CloseIcon onClick={() => setWarning(!warning)} /></div>
                </div>}
                <Options />
                <Favorites />
                <Chart />
              </div>
      
            </CurrentContext.Provider>
          </ChartContext.Provider>
        </OptionsContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;