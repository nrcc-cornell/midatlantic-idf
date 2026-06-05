import React, { useState, useEffect, useContext } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ReactGA from "react-ga4";

import "./styles/App.scss";

import Chart from "./components/Chart";
import Map from "./components/Map";
import Options from "./components/Options";
import Favorites from "./components/Favorites";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { ChartContext } from "./contexts/ChartContext";
import { CurrentContext } from "./contexts/CurrentContext";
import { DataContext } from "./contexts/DataContext";

import { useCurrentHeight, useCurrentWidth } from "./hooks/WindowSize";
import RecentUpdates from "./components/recent-updates/recent-updates.component";

function App() {
  const [chart, setChart] = useState(false);
  const [current, setCurrent] = useState(null);
  const [windowSize, setWindowSize] = useState({height: true, width: true});
  const [warning, setWarning] = useState(true);

  const { versionHasChanged } = useContext(DataContext);

  let width = useCurrentWidth();
  let height = useCurrentHeight();

  useEffect(() => {
    ReactGA.initialize("G-XECVSXTTQ9");
    ReactGA.pageview(window.location.pathname + window.location.search);
  },[]);

  useEffect(() => {
    setWindowSize({height: (height > 650), width: (width > 1000)});
  }, [height, width]);

  return (
    <ChartContext.Provider value={{chart, setChart}}>
      <CurrentContext.Provider value={{current, setCurrent}}>
        <div className="App">
          <Header />
          <div className="content" id="content">
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
          </div>
          <Footer />

          {versionHasChanged() ? <RecentUpdates hideButton={true} /> : ""}
        </div>
      </CurrentContext.Provider>
    </ChartContext.Provider>
  );
}

export default App;