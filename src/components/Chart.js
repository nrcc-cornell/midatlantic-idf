import {useContext, useState, useEffect, useRef, useCallback} from 'react'
import { Popper, Fade } from "@material-ui/core";
import store from "store";

import '../styles/Chart.scss'

import {
  Tab,
  Tabs,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Switch
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMore from 'highcharts/highcharts-more'

import {stations} from '../data'
import {OptionsContext} from '../contexts/OptionsContext'
import {ChartContext} from '../contexts/ChartContext'
import {CurrentContext} from '../contexts/CurrentContext'
import {data} from '../data'

highchartsMore(Highcharts)

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid rgb(210,210,210)',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '3px 3px 3px rgba(210,210,210,0.7)',
    padding: '10px',
  },
}));

const DataSwitch1 = withStyles({
  switchBase: {
    transition: 'all .5s',
    color: '#16bcfe',
    '&$checked': {
      color: '#16bcfe',
    },
    '&$checked + $track': {
      backgroundColor: '#16bcfe',
    },
  },
  checked: {},
  track: {backgroundColor: '#16bcfe'},
})(Switch);

const DataSwitch2 = withStyles({
  switchBase: {
    transition: 'all .5s',
    color: '#ff6969',
    '&$checked': {
      color: '#ff6969',
    },
    '&$checked + $track': {
      backgroundColor: '#ff6969',
    },
  },
  checked: {},
  track: {backgroundColor: '#ff6969'},
})(Switch);

function Chart() {
  const {chart} = useContext(ChartContext) // context that turns chart panel on/off
  const {current} = useContext(CurrentContext) // context that keeps track of the current station
  const {options} = useContext(OptionsContext) // context that keeps track of the chart options
  const [mode, setMode] = useState(0) // state that toggle between chart and tables, 0 for chart, 1 for table, 2 for comparison table
  const [showCIs, setShowCIs] = useState({ "projectedCIs": true, "observedCIs": true }); // state that toggles the CIs on the chart
  const [chartTips, setChartTips] = useState(store.get("chartTips"));
  const [popperAnchor, setPopperAnchor] = useState(false);
  const tabPanel = useRef();
  const classes = useStyles();

  const handleToggle = (ciName) => {
    console.log("Toggling...")
    console.log(showCIs);

    let newState = {...showCIs};
    newState[ciName] = newState[ciName] ? false : true;
    setShowCIs(newState);
  };

  const handleDownload = () => {
    var headers = [
      ['Station:', stations[current]["station_name"], '', '', '', '', '',''],
      ['Return Period:', `${options['rp']}-year`, '', '', '', '', '',''],
      ['Emission Scenario:', `RCP ${options['emission']}`, '', '', '', '', '',''],
      ['Time Period:', options['tp'], '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', `Projected ${options['tp']} Intensity`, '', '', 'Observed 1970-1999 Intensity', 'Projected Mean Change'],
      ['Duration', '10th', '25th', 'Mean', '75th', '90th', 'Mean', 'Difference']
    ];
    let station = stations[current]
    let fips = station.fips
    let mean = data[options['emission']][options['tp']][options['rp']][fips]['mean']
    let _10 = data[options['emission']][options['tp']][options['rp']][fips]['10%']
    let _90 = data[options['emission']][options['tp']][options['rp']][fips]['90%']
    let _25 = data[options['emission']][options['tp']][options['rp']][fips]['25%']
    let _75 = data[options['emission']][options['tp']][options['rp']][fips]['75%']
    let categories = ["5min", "10min", "15min", "30min", "60min", "2hr", "3hr", "6hr", "12hr", "24hr", "2day", "3day", "4day", "7day"]
    
    let dataArr = categories.map((duration) => {
      let row = [duration];  
      row.push((parseFloat(station[duration][`${options['rp']}-mid`])*_10).toFixed(3));
      row.push((parseFloat(station[duration][`${options['rp']}-mid`])*_25).toFixed(3));
      row.push((parseFloat(station[duration][`${options['rp']}-mid`])*mean).toFixed(3));
      row.push((parseFloat(station[duration][`${options['rp']}-mid`])*_75).toFixed(3));
      row.push((parseFloat(station[duration][`${options['rp']}-mid`])*_90).toFixed(3));
      row.push(parseFloat(station[duration][`${options['rp']}-mid`]));
      row.push(((parseFloat(station[duration][`${options['rp']}-mid`])*mean) - parseFloat(station[duration][`${options['rp']}-mid`])).toFixed(3));
      return row;
    });

    var csvData = headers.concat(dataArr);

    // Building the CSV from the Data two-dimensional array
    var csvContent = '';
    csvData.forEach(function(infoArray, index) {
      let dataString = infoArray.join(',');
      csvContent += index < csvData.length ? dataString + '\n' : dataString;
    });

    // The download function takes a CSV string, the filename and mimeType as parameters
    // Scroll/look down at the bottom of this snippet to see how download is called
    var download = function(content, fileName, mimeType) {
      var a = document.createElement('a');
      mimeType = mimeType || 'application/octet-stream';

      if (navigator.msSaveBlob) { // IE10
        navigator.msSaveBlob(new Blob([content], {
          type: mimeType
        }), fileName);
      } else if (URL && 'download' in a) { //html5 A[download]
        a.href = URL.createObjectURL(new Blob([content], {
          type: mimeType
        }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // eslint-disable-next-line no-restricted-globals
        location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
      }
    }

    download(csvContent, `${stations[current]["station_name"].split(' ')[0]}-${options['rp']}-${options['emission']}-${options['tp']}.csv`, 'text/csv;encoding:utf-8');
  }

  const renderChart = useCallback(() => {
    let station = stations[current]
    let fips = station.fips
    let mean = data[options['emission']][options['tp']][options['rp']][fips]['mean']
    let _10 = data[options['emission']][options['tp']][options['rp']][fips]['10%']
    let _90 = data[options['emission']][options['tp']][options['rp']][fips]['90%']
    let _25 = data[options['emission']][options['tp']][options['rp']][fips]['25%']
    let _75 = data[options['emission']][options['tp']][options['rp']][fips]['75%']

    let observed = []
    let observedInterval = []
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
      observedInterval.push([xValues[index], parseFloat(parseFloat(station[duration][`${options['rp']}-bound`][0]).toFixed(3)), parseFloat(parseFloat(station[duration][`${options['rp']}-bound`][1]).toFixed(3))])
      projectedInterval90.push([xValues[index], parseFloat((mid*_10).toFixed(3)), parseFloat((mid*_90).toFixed(3))])
      projectedInterval75.push([xValues[index], parseFloat((mid*_25).toFixed(3)), parseFloat((mid*_75).toFixed(3))])
      projection.push([xValues[index], parseFloat((mid*mean).toFixed(3))])
    })

    let chartOptions = {
      chart: {
        zoomType: 'x',
        height: (tabPanel.current.offsetHeight - 10)
      },

      title: {
        text: `<div>Intensity Duration Frequency Curves: ${options['rp']}-Year Return duration</div>
        <div>RCP ${options['emission']} Observed Atlas 14 Value vs. Projection (${options['tp']})</div>`,
        // useHTML: true
        useHTML: false
      },

      xAxis: {
        title: {
          text: 'Duration'
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
        },
        minorTicks: true,
        endOnTick: false,
        gridLineWidth: 2
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
        backgroundColor: "#FFFFFF",
        shared: true,
        useHTML: true,
        outside: true
      },

      legend: {
        floating: true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
        y: -50,
        backgroundColor: '#FFFFFF',
        shadow: true,
        borderRadius: 5
      },

      series: []
    }

    if (showCIs.observedCIs) {
      chartOptions.series = [
        ...chartOptions.series,
        {
          name: 'Observed Confidence Interval',
          type: "arearange",
          color: "#ffa8a8",
          data: observedInterval,
          legendIndex: 4
        }
      ]
    }

    if (showCIs.projectedCIs) {
      chartOptions.series = [
        ...chartOptions.series,
        {
          name: `Projected 90% Confidence Interval ${options['tp']}`,
          type: "arearange",
          color: "#d6f3ff",
          data: projectedInterval90,
          legendIndex: 2
        },{
          name: `Projected 75% Confidence Interval ${options['tp']}`,
          type: "arearange",
          color: "#91dfff",
          data: projectedInterval75,
          legendIndex: 1
        }
      ]
    }

    chartOptions.series = [
      ...chartOptions.series,
      {
        name: `Observed Atlas 14 Value`,
        type: "line",
        color: "#ff6969",
        data: observed,
        legendIndex: 3
      },{
        name: `Projected ${options['tp']}`,
        type: "line",
        color: "#00b7ff",
        data: projection,
        legendIndex: 0
      }
    ]


    return (
      <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
    )
  }, [current, options, showCIs])

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
            <TableCell colSpan={1} align="center" >Observed Atlas-14 Intensity 1970-1999</TableCell>
          </TableRow>
          <TableRow className="sticky-row">
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
              <TableCell className="col-shaded" align="center">{parseFloat(station[duration][`${options['rp']}-mid`])}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }

  const renderComparisonTable = () => {
    let station = stations[current]
    let fips = station.fips
    let mean = data[options['emission']][options['tp']][options['rp']][fips]['mean']
    let categories = ["5min", "10min", "15min", "30min", "60min", "2hr", "3hr", "6hr", "12hr", "24hr", "2day", "3day", "4day", "7day"]

    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Duration</TableCell>
            <TableCell align="center">Observed Atlas-14 Mean Intensity 1970-1999</TableCell>
            <TableCell align="center">Projected {options['tp']} Mean Intensity</TableCell>
            <TableCell align="center">Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((duration) => {
            let change = ((parseFloat(station[duration][`${options['rp']}-mid`])*mean) - parseFloat(station[duration][`${options['rp']}-mid`])).toFixed(3);
            let sign = change<=0?"":"+";

            return (
              <TableRow key={duration}>
                <TableCell>{duration}</TableCell>
                <TableCell align="center">{parseFloat(station[duration][`${options['rp']}-mid`])}</TableCell>
                <TableCell align="center">{(parseFloat(station[duration][`${options['rp']}-mid`])*mean).toFixed(3)}</TableCell>
                <TableCell align="center">{`${sign}${change}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }

  const stationName = () => {
    let nameArr = stations[current]["station_name"].split('');

    if (nameArr.length > 35) {
      return nameArr.slice(0,35).join('') + '...';
    } else {
      return stations[current]["station_name"];
    }
  }

  const deactivateChartTips = () => {
    store.set("chartTips", "false");
    setChartTips("false");
  };

  const renderChartTips = () => {
    let toCover = document.querySelector('#tab-panel');
    let width = toCover.offsetWidth;
    let height = toCover.offsetHeight;

    return (
      <div id="chart-tips-wrapper" style={{ width:width, height:height }} onClick={deactivateChartTips}>
        <div id="chart-tip-zoom">Click and drag on chart to zoom</div>
        <div id="chart-tip-adj-factors">Hover here to see adjustment factors</div>
      </div>
    );
  };

  const showAdjFactors = () => {
    let fips = stations[current].fips

    let name = data[options['emission']][options['tp']][options['rp']][fips]['name']
    let mean = data[options['emission']][options['tp']][options['rp']][fips]['mean']
    let _10 = data[options['emission']][options['tp']][options['rp']][fips]['10%']
    let _90 = data[options['emission']][options['tp']][options['rp']][fips]['90%']
    let _25 = data[options['emission']][options['tp']][options['rp']][fips]['25%']
    let _75 = data[options['emission']][options['tp']][options['rp']][fips]['75%']

    return (
      <Popper id="adj-popper" open={popperAnchor ? true : false} anchorEl={popperAnchor} transition disablePortal>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={300}>
            <div className={classes.paper}>
              <div><b>County: {name}</b></div>
              <div>10th: {_10}</div>
              <div>25th: {_25}</div>
              <div>Mean: {mean}</div>
              <div>75th: {_75}</div>
              <div>90th: {_90}</div>
            </div>
          </Fade>
        )}
      </Popper>
    );
  };

  return (
    <div id="chart-cont" className={`card ${!chart && 'hidden'}`}>
      <div className="station-name"><div>{chart && current && stationName()}</div></div>
      <div id="chart-control">
        <Tabs
          value={mode}
          onChange={(event, newValue) => setMode(newValue)}
          >
          <Tab label="Chart"/>
          <Tab label="Table"/>
          <Tab label="Comparison"/>
        </Tabs>
        {chart && current && mode === 1 && 
          <Button
          id="download-csv"
          aria-label="download selected data"
          onClick={handleDownload}
          >
            Download CSV
          </Button>
        }
        {chart && current && mode === 0 && <div className="ci-toggles">
            <div className="toggle-label">Toggle Confidence Areas</div>
            <div className="toggle-container">
              <DataSwitch1 checked={showCIs.projectedCIs} onChange={() => handleToggle("projectedCIs")} name="pciFilter" />
              <DataSwitch2 checked={showCIs.observedCIs} onChange={() => handleToggle("observedCIs")} name="ociFilter" />
            </div>
          </div>
        }
      </div>

      {chart && !chartTips && renderChartTips()}
      
      <div id="tab-panel" ref={tabPanel}>
        {chart && current && mode === 0 && 
          <div id="adj-factors" 
              onMouseEnter={(event) => setPopperAnchor(event.currentTarget)} 
              onMouseLeave={() => setPopperAnchor(null)} 
              >
            ?
          </div>}
        {chart && current && mode === 0 && showAdjFactors()}
        {chart && current && mode === 0 && renderChart()}
        {chart && current && mode === 1 && renderTable()}
        {chart && current && mode === 2 && renderComparisonTable()}
      </div>
    </div>
  )
}

export default Chart