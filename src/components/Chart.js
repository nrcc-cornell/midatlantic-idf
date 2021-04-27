import React, {useContext, useState, useRef, useCallback} from "react";
import {
  Tab,
  Tabs,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Switch,
  Popper,
  Fade
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import HC_offline_exporting from "highcharts/modules/offline-exporting";
import highchartsMore from "highcharts/highcharts-more";

import "../styles/Chart.scss";

import {OptionsContext} from "../contexts/OptionsContext";
import {ChartContext} from "../contexts/ChartContext";
import {CurrentContext} from "../contexts/CurrentContext";

import {stations, data} from "../data";

HC_exporting(Highcharts);
HC_offline_exporting(Highcharts);
highchartsMore(Highcharts);

const useStyles = makeStyles(() => ({
  paper: {
    border: "1px solid rgb(210,210,210)",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "3px 3px 3px rgba(210,210,210,0.7)",
    padding: "15px",
    width: "350px"
  },
  containerCell: {
    padding: "0px",
  },
  maxedCell: {
    width: "106px"
  },
  maxedCellHead: {
    width: "106px",
    textAlign: "left !important"
  },
  underlined: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid"
  },
  maxedContainer: {
    padding: "0px",
    width: "128px"
  },
  leftBorder: {
    borderLeft: "1px solid rgb(220,220,220)"
  },
  innerTable: {
    height: "73px"
  },
  small_tabs: {
    minWidth: "100px"
  },
  short_cell: {
    paddingTop: "5px",
    paddingBottom: "5px",
    borderBottom: "none"
  },
  short_cell_bordered: {
    paddingTop: "5px",
    paddingBottom: "5px",
  }
}));

const DataSwitch1 = withStyles({
  switchBase: {
    transition: "all .5s",
    color: "#16bcfe",
    "&$checked": {
      color: "#16bcfe",
    },
    "&$checked + $track": {
      backgroundColor: "#16bcfe",
    },
  },
  checked: {},
  track: {backgroundColor: "#16bcfe"},
})(Switch);

const DataSwitch2 = withStyles({
  switchBase: {
    transition: "all .5s",
    color: "#ff6969",
    "&$checked": {
      color: "#ff6969",
    },
    "&$checked + $track": {
      backgroundColor: "#ff6969",
    },
  },
  checked: {},
  track: {backgroundColor: "#ff6969"},
})(Switch);

function Chart() {
  const {chart, setChart} = useContext(ChartContext); // context that turns chart panel on/off
  const {current} = useContext(CurrentContext); // context that keeps track of the current station
  const {options} = useContext(OptionsContext); // context that keeps track of the chart options
 
  const [mode, setMode] = useState(0); // state that toggle between chart and tables, 0 for chart, 1 for table, 2 for comparison table
  const [showCIs, setShowCIs] = useState({ "projectedCIs": true, "observedCIs": false }); // state that toggles the CIs on the chart
  const [popperAnchor, setPopperAnchor] = useState(false);
 
  const tabPanel = useRef();
 
  const classes = useStyles();

  const handleDownload = () => {
    let station = stations[current];
    let fips = station.fips;
    let name = data[options["emission"]][options["tp"]][options["rp"]][fips]["name"];
    let median = data[options["emission"]][options["tp"]][options["rp"]][fips]["median"];
    let _10 = data[options["emission"]][options["tp"]][options["rp"]][fips]["10%"];
    let _90 = data[options["emission"]][options["tp"]][options["rp"]][fips]["90%"];
    let _25 = data[options["emission"]][options["tp"]][options["rp"]][fips]["25%"];
    let _75 = data[options["emission"]][options["tp"]][options["rp"]][fips]["75%"];
    let categories = ["5min", "10min", "15min", "30min", "60min", "2hr", "3hr", "6hr", "12hr", "24hr", "2day", "3day", "4day", "7day"];
    
    var headers = [
      ["Station:", stations[current]["station_name"], "", "", "", "", "",""],
      ["County:", name, "", "", "", "", "",""],
      ["Return Period:", `${options["rp"]}-year`, "", "", "", "", "",""],
      ["Emissions Scenario:", `RCP ${options["emission"]}`, "", "", "", "", "",""],
      ["Time Period:", options["tp"], "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "10th", "25th", "Median", "75th", "90th", "", ""],
      [`Change Factors for ${name} County`, _10, _25, median, _75, _90],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", `Projected ${options["tp"]} Depth (inches)`, "", "", "", "Atlas 14 (inches)", "", "Projected Change (inches)"],
      ["Duration", "10th", "25th", "Median", "75th", "90th", "Lower Bound", "Observed Depth", "Upper Bound", "Difference"]
    ];
    
    let dataArr = categories.map((duration) => {
      let dur = duration;
      dur = dur.replace("min", " min").replace("hr", " hr").replace("day", " day");
      let row = [dur];  
      row.push((parseFloat(station[duration][`${options["rp"]}-mid`])*_10).toFixed(2));
      row.push((parseFloat(station[duration][`${options["rp"]}-mid`])*_25).toFixed(2));
      row.push((parseFloat(station[duration][`${options["rp"]}-mid`])*median).toFixed(2));
      row.push((parseFloat(station[duration][`${options["rp"]}-mid`])*_75).toFixed(2));
      row.push((parseFloat(station[duration][`${options["rp"]}-mid`])*_90).toFixed(2));
      row.push(parseFloat(station[duration][`${options["rp"]}-bound`][0]));
      row.push(parseFloat(station[duration][`${options["rp"]}-mid`]));
      row.push(parseFloat(station[duration][`${options["rp"]}-bound`][1]));
      row.push(((parseFloat(station[duration][`${options["rp"]}-mid`])*median) - parseFloat(station[duration][`${options["rp"]}-mid`])).toFixed(2));
      return row;
    });

    var csvData = headers.concat(dataArr);

    var csvContent = "";
    csvData.forEach(function(infoArray, index) {
      let dataString = infoArray.join(",");
      csvContent += index < csvData.length ? dataString + "\n" : dataString;
    });

    var download = function(content, fileName, mimeType) {
      var a = document.createElement("a");
      mimeType = mimeType || "application/octet-stream";

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(new Blob([content], {
          type: mimeType
        }), fileName);
      } else if (URL && "download" in a) {
        a.href = URL.createObjectURL(new Blob([content], {
          type: mimeType
        }));
        a.setAttribute("download", fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        location.href = "data:application/octet-stream," + encodeURIComponent(content);
      }
    };

    download(csvContent, `${stations[current]["station_name"].split(" ")[0]}-${options["rp"]}-${options["emission"]}-${options["tp"]}.csv`, "text/csv;encoding:utf-8");
  };

  const handleToggle = (ciName) => {
    let newState = {...showCIs};
    newState[ciName] = newState[ciName] ? false : true;
    setShowCIs(newState);
  };

  const renderChart = useCallback(() => {
    let station = stations[current];
    let fips = station.fips;
    let median = data[options["emission"]][options["tp"]][options["rp"]][fips]["median"];
    let _10 = data[options["emission"]][options["tp"]][options["rp"]][fips]["10%"];
    let _90 = data[options["emission"]][options["tp"]][options["rp"]][fips]["90%"];
    let _25 = data[options["emission"]][options["tp"]][options["rp"]][fips]["25%"];
    let _75 = data[options["emission"]][options["tp"]][options["rp"]][fips]["75%"];

    let observed = [];
    let observedInterval = [];
    let projectedInterval90 = [];
    let projectedInterval75 = [];
    let projection = [];
    let categories = ["5min", "10min", "15min", "30min", "60min", "2hr", "3hr", "6hr", "12hr", "24hr"];
    let xValues = [1/12, 1/6, 1/4, 1/2, 1, 2, 3, 6, 12, 24, 48, 72, 96, 168];
    let xLabels = {};
    xValues.forEach((val, index) => xLabels[val] = categories[index]);
    
    categories.forEach((duration, index) => {
      let mid = parseFloat(station[duration][`${options["rp"]}-mid`]);
      observed.push([xValues[index], mid]);
      observedInterval.push([xValues[index], parseFloat(parseFloat(station[duration][`${options["rp"]}-bound`][0]).toFixed(2)), parseFloat(parseFloat(station[duration][`${options["rp"]}-bound`][1]).toFixed(3))]);
      projectedInterval90.push([xValues[index], parseFloat((mid*_10).toFixed(2)), parseFloat((mid*_90).toFixed(2))]);
      projectedInterval75.push([xValues[index], parseFloat((mid*_25).toFixed(2)), parseFloat((mid*_75).toFixed(2))]);
      projection.push([xValues[index], parseFloat((mid*median).toFixed(2))]);
    });

    let chartOptions = {
      chart: {
        zoomType: "x",
        height: (tabPanel.current.offsetHeight - 10)
      },

      credits: {
        enabled: false
      },

      exporting: {
        sourceWidth: 900,
        sourceHeight: 450,
        chartOptions: {
          chart : {
            events: {
              load: function() {
                this.renderer.image((process.env.PUBLIC_URL + "/logos/PoweredbyACIS_NRCC.jpg"),830,420,70,30).add();
              }
            }
          },
          legend: {
            itemStyle: {
              "fontSize": "8px",
              "fontWeight": "400",
            }
          },
          title: {
            style: {
              "color": "#000000",
              "fontSize": "11px"
            }
          },
          xAxis: [{
            title: {
              text: "Duration",
              style: {
                "fontSize": "10px",
                "fontWeight": "bold",
                "color": "#000000",
              },
            },
            tickPositions: [xValues[0], ...xValues.slice(6)],
            tickColor: "#000000",
            lineColor: "#000000",
            lineWidth: 2,
            labels: {
              enabled: true,
              style: {
                "fontSize": "10px",
                "color": "#000000",
              },
              formatter: function() {
                return xLabels[this.value];
              }
            },
          }],
      
          yAxis: [{
            title: {
              text: "Depth(inches)",
              style: {
                "fontSize": "10px",
                "fontWeight": "bold",
                "color": "#000000",
              },
            },
            endOnTick: false,
            lineWidth: 2,
            lineColor: "#000000",
            gridLineColor: "#000000",
            labels: {
              style: {
                "fontSize": "10px",
                "color": "#000000",
              },
            },
          }],
        },
        filename: `${stations[current]["station_name"].split(" ")[0]}-${options["rp"]}-${options["emission"]}-${options["tp"]}-chart`,
      },

      title: {
        text: `<div>IDF Curve: ${options["rp"]}-Year Return Period Under</div>
        <div>RCP ${options["emission"]} From ${options["tp"]}</div>`,
        style: { "color": "#000000", "fontSize": "18px" }
      },

      xAxis: {
        title: {
          text: "Duration",
          style: {
            "fontSize": "14px",
            "fontWeight": "bold",
            "color": "#000000",
          },
        },
        tickPositions: [xValues[0], ...xValues.slice(6)],
        tickColor: "#000000",
        lineColor: "#000000",
        lineWidth: 2,
        labels: {
          enabled: true,
          style: {
            "fontSize": "14px",
            "color": "#000000",
          },
          formatter: function() {
            return xLabels[this.value];
          }
        },
      },

      yAxis: {
        title: {
          text: "Depth (inches)",
          style: {
            "fontSize": "14px",
            "fontWeight": "bold",
            "color": "#000000",
          },
        },
        endOnTick: false,
        lineWidth: 2,
        lineColor: "#000000",
        gridLineColor: "#000000",
        labels: {
          style: {
            "fontSize": "14px",
            "color": "#000000",
          },
        },
      },

      tooltip: {
        formatter: function () {
          return this.points.reduce(function (s, point) {
            if (s.includes("min") && !s.includes("minutes")) {
              s = `Duration: <b>${s.match(/\d+/)} minutes</b>`;
            } else if (s.includes("hr")) {
              s = `Duration: <b>${s.match(/\d+/)} hours</b>`;
            }

            return `${s}<br/>${point.series.name.replace("IDF Curve", `${options["tp"]} Depth`)}: <b>${(point.point.high&&point.point.low) ? `${point.point.low}-${point.point.high}` : point.y} inches</b>`;
          }, "<b>" + xLabels[this.x] + "</b>");
        },
        backgroundColor: "#FFFFFF",
        shared: true,
        useHTML: true,
        outside: true
      },

      legend: {
        floating: true,
        layout: "vertical",
        align: "right",
        verticalAlign: "bottom",
        y: -50,
        backgroundColor: "#FFFFFF",
        shadow: true,
        borderRadius: 5
      },

      series: []
    };

    if (showCIs.observedCIs) {
      chartOptions.series = [
        ...chartOptions.series,
        {
          name: "Atlas 14 Confidence Interval",
          type: "arearange",
          color: "#ffa8a8",
          fillOpacity: 0.9,
          data: observedInterval,
          legendIndex: 4
        }
      ];
    }

    if (showCIs.projectedCIs) {
      chartOptions.series = [
        ...chartOptions.series,
        {
          name: "Projected 90% Confidence Interval",
          type: "arearange",
          color: "#d6f3ff",
          fillOpacity: 0.9,
          data: projectedInterval90,
          legendIndex: 2
        },{
          name: "Projected 75% Confidence Interval",
          type: "arearange",
          fillOpacity: 0.9,
          color: "#91dfff",
          data: projectedInterval75,
          legendIndex: 1
        }
      ];
    }

    chartOptions.series = [
      ...chartOptions.series,
      {
        name: "Atlas 14 IDF Curve",
        type: "line",
        color: "#ff6969",
        data: observed,
        legendIndex: 3
      },{
        name: "Projected IDF Curve",
        type: "line",
        color: "#00b7ff",
        data: projection,
        legendIndex: 0
      }
    ];


    return (
      <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
    );
  }, [current, options, showCIs]);
 
  const renderComparisonTable = () => {
    let station = stations[current];
    let fips = station.fips;
    let median = data[options["emission"]][options["tp"]][options["rp"]][fips]["median"];
    let categories = ["5min", "10min", "15min", "30min", "60min", "2hr", "3hr", "6hr", "12hr", "24hr", "2day", "3day", "4day", "7day"];

    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Duration</TableCell>
            <TableCell align="center">Atlas 14 Depth (inches)</TableCell>
            <TableCell align="center">Projected {options["tp"]} Depth (inches)</TableCell>
            <TableCell align="center">Change (inches)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((duration) => {
            let change = ((parseFloat(station[duration][`${options["rp"]}-mid`])*median) - parseFloat(station[duration][`${options["rp"]}-mid`])).toFixed(2);
            let sign = change<=0?"":"+";
            let dur = duration;
            dur = dur.replace("min", " min").replace("hr", " hr").replace("day", " day");

            return (
              <TableRow key={duration}>
                <TableCell>{dur}</TableCell>
                <TableCell align="center">{parseFloat(station[duration][`${options["rp"]}-mid`])}</TableCell>
                <TableCell align="center">{(parseFloat(station[duration][`${options["rp"]}-mid`])*median).toFixed(2)}</TableCell>
                <TableCell align="center">{`${sign}${change}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  const renderTable = () => {
    let station = stations[current];
    let fips = station.fips;
    let median = data[options["emission"]][options["tp"]][options["rp"]][fips]["median"];
    let _10 = data[options["emission"]][options["tp"]][options["rp"]][fips]["10%"];
    let _90 = data[options["emission"]][options["tp"]][options["rp"]][fips]["90%"];
    let _25 = data[options["emission"]][options["tp"]][options["rp"]][fips]["25%"];
    let _75 = data[options["emission"]][options["tp"]][options["rp"]][fips]["75%"];
    let categories = ["5min", "10min", "15min", "30min", "60min", "2hr", "3hr", "6hr", "12hr", "24hr", "2day", "3day", "4day", "7day"];
    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className={classes.short_cell_bordered}>Percentile</TableCell>
            <TableCell className={classes.short_cell_bordered} align="center">10th</TableCell>
            <TableCell className={classes.short_cell_bordered} align="center">25th</TableCell>
            <TableCell className={classes.short_cell_bordered} align="center">Median</TableCell>
            <TableCell className={classes.short_cell_bordered} align="center">75th</TableCell>
            <TableCell className={classes.short_cell_bordered} align="center">90th</TableCell>
            <TableCell />
          </TableRow>
          <TableRow className="sticky-row">
            <TableCell className={classes.containerCell} colSpan={6}>
              <Table className={classes.innerTable}>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.maxedCellHead} style={{textAlign: "center"}}>County Change Factors:</TableCell>   
                    <TableCell align="center">{_10}</TableCell>
                    <TableCell align="center">{_25}</TableCell>
                    <TableCell align="center">{median}</TableCell>
                    <TableCell align="center">{_75}</TableCell>
                    <TableCell align="center">{_90}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.short_cell}>Duration</TableCell>   
                    <TableCell className={classes.short_cell} colSpan={5} align="center" >Projected {options["tp"]} Depth (inches)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>

            <TableCell align="center" className={classes.leftBorder}>Atlas 14 Depth (inches)</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {categories.map((duration) => {
            let dur = duration;
            dur = dur.replace("min", " min").replace("hr", " hr").replace("day", " day");
            
            return (
              <TableRow key={duration}>
                <TableCell className={classes.maxedCell}>{dur}</TableCell>
                <TableCell align="center">{(parseFloat(station[duration][`${options["rp"]}-mid`])*_10).toFixed(2)}</TableCell>
                <TableCell align="center">{(parseFloat(station[duration][`${options["rp"]}-mid`])*_25).toFixed(2)}</TableCell>
                <TableCell align="center">{(parseFloat(station[duration][`${options["rp"]}-mid`])*median).toFixed(2)}</TableCell>
                <TableCell align="center">{(parseFloat(station[duration][`${options["rp"]}-mid`])*_75).toFixed(2)}</TableCell>
                <TableCell align="center">{(parseFloat(station[duration][`${options["rp"]}-mid`])*_90).toFixed(2)}</TableCell>
                <TableCell className="col-shaded" align="center">{parseFloat(station[duration][`${options["rp"]}-mid`])}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  const showTogglesPopper = () => {
    return (
      <Popper id="toggle-popper"
        open={popperAnchor ? true : false}
        anchorEl={popperAnchor}
        placement="top"
        transition
        disablePortal>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={300}>
            <div className={classes.paper}>
              <div className="toggle-info-top">
                <div className="dot blue"></div>
                <span>: Projected Confidence Intervals</span>
              </div>
              <div className="toggle-info-bottom">
                <div className="dot red"></div>
                <span>: Atlas 14 Confidence Intervals</span>
              </div>
            </div>
          </Fade>
        )}
      </Popper>
    );
  };

  const stationName = () => {
    let nameArr = stations[current]["station_name"].split("");

    if (nameArr.length > 35) {
      return nameArr.slice(0,35).join("") + "...";
    } else {
      return stations[current]["station_name"];
    }
  };

  return (
    <div id="chart-cont" className={`card ${!chart && "hidden"}`}>
      <div className="station-name"><div>{chart && current && stationName()}</div></div>
      <div className="zoom-instructions">Click and drag on chart to zoom</div>
      <div className="close-btn"><CloseIcon onClick={() => setChart(!chart)} /></div>
      <div id="chart-control">
        <Tabs
          value={mode}
          onChange={(event, newValue) => setMode(newValue)}
        >
          <Tab className={classes.small_tabs} label="Chart"/>
          <Tab className={classes.small_tabs} label="Table"/>
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
          <div className="toggle-label">Toggle Confidence Intervals</div>
          <div className="toggle-container"
            onMouseEnter={(event) => setPopperAnchor(event.currentTarget)} 
            onMouseLeave={() => setPopperAnchor(null)} 
          >
            {showTogglesPopper()}
            <DataSwitch1
              checked={showCIs.projectedCIs}
              onChange={() => handleToggle("projectedCIs")}
              name="pciFilter"
              inputProps={{ "aria-label": "Toggle Projected Confidence Interval Areas" }} />
            <DataSwitch2
              checked={showCIs.observedCIs}
              onChange={() => handleToggle("observedCIs")}
              name="ociFilter"
              inputProps={{ "aria-label": "Toggle Observed Upper and Lower Bounds Areas" }} />
          </div>
        </div>
        }
        {chart && current && mode === 0 && <img src={process.env.PUBLIC_URL + "/logos/PoweredbyACIS_NRCC.jpg"} alt="NRCC logo" className="logo-overlay"></img>}
      </div>

      <div id="tab-panel" ref={tabPanel}>
        {chart && current && mode === 0 && renderChart()}
        {chart && current && mode === 1 && renderTable()}
        {chart && current && mode === 2 && renderComparisonTable()}
      </div>
    </div>
  );
}

export default Chart;