import React, { useState } from "react";

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

function App() {
  const [options, setOptions] = useState({"emission": "4.5", "tp": "2020-2070", "rp": "2", "area": "both"});
  const [chart, setChart] = useState(false);
  const [current, setCurrent] = useState(null);

  return (
    <div className="App">
      <Header />
      <div className="content" id="content">
        <OptionsContext.Provider value={{options, setOptions}}>
          <ChartContext.Provider value={{chart, setChart}}>
            <CurrentContext.Provider value={{current, setCurrent}}>
        
              <Map />
              <div id="grid">
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