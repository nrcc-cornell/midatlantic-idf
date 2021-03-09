import {useState, useContext, useEffect} from 'react'
import './styles/App.scss';

import Chart from './components/Chart'
import Map from './components/Map'
import Options from './components/Options'
import Search from './components/Search'
import Header from './components/Header'
import Footer from './components/Footer'

import {stations, counties} from './data'

import {OptionsContext} from './contexts/OptionsContext'
import {ChartContext} from './contexts/ChartContext'
import {CurrentContext} from './contexts/CurrentContext'

import './styles/Map.scss'
function App() {
  const [options, setOptions] = useState({"emission": "4.5", "tp": "2020-2070", "rp": "2"})
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
          </div>
        </CurrentContext.Provider>
        </ChartContext.Provider>
        </OptionsContext.Provider>
      </div>

      <Footer />
    </div>
  )
}

export default App;
