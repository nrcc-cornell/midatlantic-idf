import {useState, useContext, useEffect} from 'react'
import './styles/App.scss';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

import Chart from './components/Chart'
import Map from './components/Map'
import Options from './components/Options'
import Search from './components/Search'
import Header from './components/Header'
import Footer from './components/Footer'
import Legend from './components/Legend'

import {stations, counties} from './data'

import {OptionsContext} from './contexts/OptionsContext'
import {ChartContext} from './contexts/ChartContext'
import {CurrentContext} from './contexts/CurrentContext'

import './styles/Map.scss'
function App() {
  const [options, setOptions] = useState({"emission": "4.5", "tp": "2020-2070", "rp": "2", "area": "virginia"})
  const [chart, setChart] = useState(false)
  const [current, setCurrent] = useState(null)

  // const processJson = () => {
  //   let emissions = ["4.5", "8.5"]
  //   let tps = ["2020-2070", "2050-2100"]
  //   let rps = ["2", "5", "10", "25", "50", "100"]
  //   let rtn = {}
  //   emissions.forEach(emission => {
  //     rtn[emission] = {}
  //     tps.forEach(tp => {
  //       rtn[emission][tp] = {}
  //       rps.forEach(rp => {
  //         rtn[emission][tp][rp] = {}
  //         console.log(rtn)
  //         let file = `cf_rcp${parseInt(emission)}5_${tp}_d${rp}.json`
  //         fetch(`./${file}`,{
  //           headers : { 
  //             'Content-Type': 'application/json',
  //             'Accept': 'application/json'
  //           }
  //         }).then(data => data.json())
  //         .then(data => {
  //           // console.log(data)
  //           const {NAME, mean, GEOID} = data
  //           let max = 1
  //           let min = 1
  //           for(let i = 0; i<=327; i++) {
  //             if(mean[i] > max) max = mean[i]
  //             if(mean[i] < min) min = mean[i] 
  //             rtn[emission][tp][rp][GEOID[i]] = {
  //               name: NAME[i],
  //               mean: mean[i],
  //               "10%": data["10%"][i],
  //               "90%": data["90%"][i],
  //               "25%": data["25%"][i],
  //               "75%": data["75%"][i]
  //             }
  //           }
  //           rtn[emission][tp][rp].max = max
  //           rtn[emission][tp][rp].min = min
  //           console.log(rtn)
  //         })
  //       })
  //     })
  //   })
  // } 
  //process the json files in the public folders and combine them into one data object.

  // useEffect(() => {
  //   processJson()
  // }, [])

  return (
    // <Router>
      <div className="App">
        <Header />
        <div className="content">
          <OptionsContext.Provider value={{options, setOptions}}>
          <ChartContext.Provider value={{chart, setChart}}>
          <CurrentContext.Provider value={{current, setCurrent}}>
          
          <Map />
          <div id="grid">
            <Options />
            <Search />
            <Chart />
            <Legend />
          </div>
          
            {/* <Switch>
              <Route path="/be99/Chesapeake/map">
                <Map />
                <div id="grid">
                  <Options />
                  <Search />
                  <Chart />
                </div>
              </Route>
              <Route path="/be99/Cheasapeake/usage">
                <div style={{fontSize: '60px', width: 'fit-content', padding: '60px', margin: '0 auto'}}>Under Construction</div>
                <div style={{fontSize: '30px', position: 'absolute', right: '230px', top: '150px'}}>Please navigate to a different page</div>
                <div style={{position: 'absolute', fontSize: '80px', right: '580px', top: '100px', color: 'red'}}>^</div>
                <div style={{position: 'absolute', fontSize: '80px', right: '340px', top: '100px', color: 'red'}}>^</div>
              </Route>
              <Route path="/">
                <div style={{fontSize: '60px', width: 'fit-content', padding: '60px', margin: '0 auto'}}>Under Construction</div>
                <div style={{fontSize: '30px', position: 'absolute', right: '40px', top: '150px'}}>Please navigate to a different page</div>
                <div style={{position: 'absolute', fontSize: '80px', right: '350px', top: '100px', color: 'red'}}>^</div>
                <div style={{position: 'absolute', fontSize: '80px', right: '80px', top: '100px', color: 'red'}}>^</div>
              </Route>
            </Switch> */}
          </CurrentContext.Provider>
          </ChartContext.Provider>
          </OptionsContext.Provider>
        </div>
        <Footer />
      </div>
    // </Router>
  )
}

export default App;



// TODO:

// secure api key with .env and url restriction
// set up mapbox account for app and use it's key for production
// above means migrating styles and tilesets
// table that has all of the county adjustments in alphabetical order by county, and when you click on the county it opens that table and scrolls to it / highlights it