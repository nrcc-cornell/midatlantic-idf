import {useContext, useState, useRef, useCallback} from 'react'

import '../styles/Chart.scss'

import {
  Tab,
  Tabs,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMore from 'highcharts/highcharts-more'

import {stations} from '../data'
import {OptionsContext} from '../contexts/OptionsContext'
import {ChartContext} from '../contexts/ChartContext'
import {CurrentContext} from '../contexts/CurrentContext'
import {data} from '../data'

highchartsMore(Highcharts)

function Chart() {
  const {chart} = useContext(ChartContext) // context that turns chart panel on/off
  const {current} = useContext(CurrentContext) // context that keeps track of the current station
  const {options} = useContext(OptionsContext) // context that keeps track of the chart options
  const [mode, setMode] = useState(0) // state that toggle between chart and table, 0 for chart, 1 for table
  const tabPanel = useRef()

  const renderChart = useCallback(() => {
    let station = stations[current]
    let fips = station.fips
    let mean = data[options['emission']][options['tp']][options['rp']][fips]['mean']
    let _10 = data[options['emission']][options['tp']][options['rp']][fips]['10%']
    let _90 = data[options['emission']][options['tp']][options['rp']][fips]['90%']
    let _25 = data[options['emission']][options['tp']][options['rp']][fips]['25%']
    let _75 = data[options['emission']][options['tp']][options['rp']][fips]['75%']
    
    let observed = []
    let projectedInterval90 = []
    let projectedInterval75 = []
    let projection = []
    let categories = ["5min", "10min", "15min", "30min", "60min", "2hr", "3hr", "6hr", "12hr", "24hr"]
    let xValues = [1/12, 1/6, 1/4, 1/2, 1, 2, 3, 6, 12, 24, 48, 72, 96, 168]
    let xLabels = {}
    xValues.forEach((val, index) => xLabels[val] = categories[index])
    
    categories.forEach((duration, index) => {
      let mid = parseFloat(station[duration][`${options['rp']}-mid`])
      observed.push([xValues[index], mid])
      projectedInterval90.push([xValues[index], parseFloat((mid*_10).toFixed(3)), parseFloat((mid*_90).toFixed(3))])
      projectedInterval75.push([xValues[index], parseFloat((mid*_25).toFixed(3)), parseFloat((mid*_75).toFixed(3))])
      projection.push([xValues[index], parseFloat((mid*mean).toFixed(3))])
    })


    let chartOptions = {
      chart: {
        zoomType: 'x',
        height: tabPanel.current.offsetHeight
      },

      title: {
        text: `<div>Intensity Duration Frequency Curves: ${options['rp']}-Year Return duration</div>
        <div>RCP ${options['emission']} Observed Atlas 14 Value vs. Projection (${options['tp']})</div>`,
        useHTML: true
      },

      xAxis: {
        title: {
          text: 'Intensity Duration Frequency'
        },
        tickPositions: [xValues[0], ...xValues.slice(6)],
        labels: {
          enabled: true,
          formatter: function() {
            return xLabels[this.value]
          }
        }
      },

      yAxis: {
          title: {
              text: "Intensity(inches)"
          }
      },

      tooltip: {
        formatter: function () {
          return this.points.reduce(function (s, point) {
            if (s.includes('min') && !s.includes('minutes')) {
              s = `${s.match(/\d+/)} minutes`;
            } else if (s.includes('hr')) {
              s = `${s.match(/\d+/)} hours`;
            }

            return `<b>${s}</b><br/>${point.series.name}: <b>${(point.point.high&&point.point.low) ? `${point.point.low}-${point.point.high}` : point.y}</b> inches`
          }, '<b>' + xLabels[this.x] + '</b>');
        },
        shared: true,
        useHTML: true,
        outside: true
      },

      series: [
        {
          name: `Projected 90% Confidence Interval ${options['tp']}`,
          type: "arearange",
          color: "#d6f3ff",
          data: projectedInterval90
        },{
          name: `Projected 75% Confidence Interval ${options['tp']}`,
          type: "arearange",
          color: "#91dfff",
          data: projectedInterval75
        },{
          name: `Observed Atlas 14 Value`,
          type: "line",
          color: "#ff6969",
          data: observed
        },{
          name: `Projected ${options['tp']}`,
          type: "line",
          color: "#00b7ff",
          data: projection
        }
      ]

    }
    return (
      <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
    )
  }, [current, options])

  const renderTable = () => {
    let station = stations[current]
    let fips = station.fips
    let mean = data[options['emission']][options['tp']][options['rp']][fips]['mean']
    let _10 = data[options['emission']][options['tp']][options['rp']][fips]['10%']
    let _90 = data[options['emission']][options['tp']][options['rp']][fips]['90%']
    let _25 = data[options['emission']][options['tp']][options['rp']][fips]['25%']
    let _75 = data[options['emission']][options['tp']][options['rp']][fips]['75%']
    let categories = ["5min", "10min", "15min", "30min", "60min", "2hr", "3hr", "6hr", "12hr", "24hr", "2day", "3day", "4day", "7day"]
    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell colSpan={5} align="center" >Projected {options['tp']} Intensity</TableCell>
            <TableCell colSpan={1} align="center" >Observed 1970-1999 Intensity</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Duration</TableCell>
            <TableCell align="center">10th</TableCell>
            <TableCell align="center">25th</TableCell>
            <TableCell align="center">Mean</TableCell>
            <TableCell align="center">75th</TableCell>
            <TableCell align="center">90th</TableCell>
            <TableCell align="center">Mean</TableCell>   
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(duration => 
            <TableRow key={duration}>
              <TableCell>{duration}</TableCell>
              <TableCell align="center">{(parseFloat(station[duration][`${options['rp']}-mid`])*_10).toFixed(3)}</TableCell>
              <TableCell align="center">{(parseFloat(station[duration][`${options['rp']}-mid`])*_25).toFixed(3)}</TableCell>
              <TableCell align="center">{(parseFloat(station[duration][`${options['rp']}-mid`])*mean).toFixed(3)}</TableCell>
              <TableCell align="center">{(parseFloat(station[duration][`${options['rp']}-mid`])*_75).toFixed(3)}</TableCell>
              <TableCell align="center">{(parseFloat(station[duration][`${options['rp']}-mid`])*_90).toFixed(3)}</TableCell>
              <TableCell align="center">{parseFloat(station[duration][`${options['rp']}-mid`])}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }

  return (
    <div id="chart-cont" className={`card ${!chart && 'hidden'}`}>
      <div id="chart-control">
        <Tabs
          value={mode}
          onChange={(event, newValue) => setMode(newValue)}
        >
          <Tab label="Chart"/>
          <Tab label="Table"/>
        </Tabs>
      </div>
      <div id="tab-panel" ref={tabPanel}>
        {chart && current && mode === 0 && renderChart()}
        {chart && current && mode === 1 && renderTable()}
      </div>
    </div>
  )
}

export default Chart