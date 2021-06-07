import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { NavigationControl,
  Source,
  Layer,
  Marker,
  Popup,
  FlyToInterpolator
} from "react-map-gl";
import PropTypes from "prop-types";

import "../styles/Map.scss";

import {data, stations, counties, virginiaCounties} from "../data";

import { OptionsContext } from "../contexts/OptionsContext";
import { ChartContext } from "../contexts/ChartContext";
import { CurrentContext } from "../contexts/CurrentContext";
import Legend from "./Legend";

function Map() {
  const { options: { emission, rp, tp, area } } = useContext(OptionsContext);

  const [popup, setPopup] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [countyFilter, setCountyFilter] = useState(counties);
  const [currentData, setCurrentData] = useState(null);
  const [colorExpression, setColorExpression] = useState(null);

  const minMax = 1.30;
  const citiesFips = [
    "51510",
    "51515",
    "51520",
    "51530",
    "51540",
    "51550",
    "51570",
    "51580",
    "51590",
    "51595",
    "51600",
    "51610",
    "51620",
    "51630",
    "51640",
    "51650",
    "51660",
    "51670",
    "51678",
    "51680",
    "51683",
    "51685",
    "51690",
    "51700",
    "51710",
    "51720",
    "51730",
    "51735",
    "51740",
    "51750",
    "51760",
    "51770",
    "51775",
    "51790",
    "51800",
    "51810",
    "51820",
    "51830",
    "51840",
  ];
 
  useEffect(() => {
    const newCurrentData = data[emission][tp][rp];
    setCurrentData(newCurrentData);
  }, [emission, tp, rp]);

  const getViewSettings = () => {
    let viewWidth = document.querySelector("html").clientWidth;
    let viewHeight = document.querySelector("html").clientHeight;
    let lat, long, zoom;

    if (area === "bay") {
      lat = 40.3;
      long = -78.1;
      zoom = 5.8;
      
      if (viewWidth <= 1400 && viewWidth > 1085) {
        lat = 40.1;
        long = -78.0;
      } else if (viewWidth <= 1085) {
        lat = 40.1;
        long = -77.95;
        zoom = 5.7;
      }
      
      if (viewHeight <= 1070 && viewHeight > 1010 && zoom >= 5.7) {
        lat = 40.05;
        zoom = 5.7;
      } else if (viewHeight <= 1010 && viewHeight > 965 && zoom >= 5.6) {
        lat = 40.0;
        zoom = 5.6;
      } else if (viewHeight <= 965 && viewHeight > 920 && zoom >= 5.5) {
        lat = 40.0;
        zoom = 5.5;
      } else if (viewHeight <= 920 && viewHeight > 880 && zoom >= 5.4) {
        lat = 40.0;
        zoom = 5.4;
      } else if (viewHeight <= 880 && viewHeight > 835 && zoom >= 5.3) {
        lat = 39.95;
        zoom = 5.3;
      } else if (viewHeight <= 835 && viewHeight > 800 && zoom >= 5.2) {
        lat = 39.9;
        zoom = 5.2;
      } else if (viewHeight <= 800 && zoom > 5.1) {
        lat = 39.9;
        zoom = 5.1;
      }

    } else if (area === "virginia") {
      lat = 38.0;
      long = -79.4;
      zoom = 6.5;
      
      if (viewWidth <= 1860 && viewWidth > 1800) {
        lat = 37.9;
        zoom = 6.4;
      } else if (viewWidth <= 1800 && viewWidth > 1465) {
        lat = 37.7;
        long = -79.7;
        zoom = 6.3;
      } else if (viewWidth <= 1465 && viewWidth > 1395) {
        lat = 37.7;
        long = -79.75;
        zoom = 6.2;
      } else if (viewWidth <= 1395 && viewWidth > 1330) {
        lat = 37.7;
        long = -79.75;
        zoom = 6.1;
      } else if (viewWidth <= 1330 && viewWidth > 1275) {
        lat = 37.7;
        long = -79.78;
        zoom = 6.0;
      } else if (viewWidth <= 1275 && viewWidth > 1225) {
        long = -79.78;
        zoom = 5.9;
      } else if (viewWidth <= 1225 && viewWidth > 1175) {
        long = -79.82;
        zoom = 5.8;
      } else if (viewWidth <= 1175 && viewWidth > 1125) {
        long = -79.84;
        zoom = 5.7;
      } else if (viewWidth <= 1125 && viewWidth > 1087) {
        long = -79.88;
        zoom = 5.6;
      } else if (viewWidth <= 1087 && viewWidth > 1050) {
        long = -79.9;
        zoom = 5.5;
      } else if (viewWidth <= 1050) {
        long = -79.9;
        zoom = 5.4;
      }
    } else {
      lat = 40.3;
      long = -79.1;
      zoom = 5.6;
  
      if (viewWidth <= 1420 && viewWidth > 1175) {
        zoom = 5.5;
      } else if (viewWidth <= 1175 && viewWidth > 1110) {
        long = -79.3;
        zoom = 5.4;
      } else if (viewWidth <= 1110 && viewWidth > 1075) {
        long = -79.4;
        zoom = 5.3;
      } else if (viewWidth <= 1075) {
        long = -79.4;
        zoom = 5.2;
      }

      if (viewHeight <= 980 && viewHeight > 920 && zoom >= 5.5) {
        lat = 40.0;
        zoom = 5.5;
      } else if (viewHeight <= 920 && viewHeight > 880 && zoom >= 5.4) {
        lat = 40.0;
        zoom = 5.4;
      } else if (viewHeight <= 880 && viewHeight > 840 && zoom >= 5.3) {
        lat = 40.0;
        zoom = 5.3;
      } else if (viewHeight <= 840 && viewHeight > 800 && zoom >= 5.2) {
        lat = 39.9;
        zoom = 5.2;
      } else if (viewHeight <= 800 && viewHeight > 760 && zoom >= 5.1) {
        lat = 39.9;
        zoom = 5.1;
      } else if (viewHeight <= 760 && viewHeight > 720 && zoom >= 5.0) {
        lat = 39.9;
        zoom = 5.0;
      } else if (viewHeight <= 720 && viewHeight > 680 && zoom >= 4.9) {
        lat = 39.9;
        zoom = 4.9;
      } else if (viewHeight <= 680 && zoom >= 4.8) {
        lat = 39.9;
        zoom = 4.8;
      }
    }

    return {
      latitude: lat,
      longitude: long,
      zoom: zoom,
      minZoom: zoom
    };
  };

  const [viewport, setViewport] = useState(getViewSettings());

  useEffect(() => {
    if (currentData) {
      let newColorExpression = ["match", ["get", "GEOID"]];

      const getColorValue = (proportion, range, base) => {
        return base + proportion * range;
      };

      Object.entries(currentData).forEach(([id, { median }]) => {
        let color;

        if(median > 1) {
          let value = median - 1;
          let upperRange = minMax - 1;
          let proportion = value / upperRange;

          if (proportion < 0.05) {
            proportion = value / (upperRange * 0.05);
            color = `rgba(${getColorValue(proportion, -190, 255)}, ${getColorValue(proportion, -30, 255)}, ${getColorValue(proportion, -225, 255)}, 1)`;
          } else if (proportion < 0.34) {
            proportion = (value - upperRange * 0.05) / (upperRange * 0.34 - upperRange * 0.05);
            color = `rgba(${getColorValue(proportion, -30, 65)}, ${getColorValue(proportion, -120, 225)}, 30, 1)`;
          } else {
            proportion = (value - upperRange * 0.34) / (upperRange - upperRange * 0.34);
            color = `rgba(35, ${getColorValue(proportion, -65, 105)}, ${getColorValue(proportion, 195, 30)}, 1)`;
          }
        } else if (median < 1) {
          let proportion = (1 - median) / (1 - minMax);
          color = `rgba(255, ${getColorValue(proportion, -50, 255)}, ${getColorValue(proportion, -155, 255)}, 1)`;
        } else {
          color = "rgba(255,255,255,1)";
        }
        
        newColorExpression.push(id, color);
      });

      newColorExpression.push("rgba(0, 0, 0, 0)");
      
      setColorExpression(newColorExpression);
    }
  }, [currentData]);

  const countyLayer = {
    id: "county-join",
    type: "fill",
    "source-layer": "cb_2019_us_county_500k-ctuas3",
    paint: {
      "fill-color": colorExpression,
      "fill-outline-color": "rgba(100,100,100,1)"
    }
  };

  const countyLines = {
    id: "county-join-line",
    type: "line",
    "source-layer": "cb_2019_us_county_500k-ctuas3",
    paint: {
      "line-color": "rgba(100,100,100,1)",
      "line-width": 1
    }
  };

  const countyNameLayer = {
    id: "county-join-names",
    type: "symbol",
    "source-layer": "counties-04lavc",
    layout: {
      "text-field": ["get", "name"],
      "text-size": 12,
    },
    paint: {
      "text-halo-width": 1,
      "text-halo-color": "rgba(0,0,0,1)",
      "text-color": "#dddddd"
    }
  };

  const handleMarkerMouseEnter = (id) => {
    setPopup(stations[id]);
  };

  const handleMarkerMouseLeave = () => {
    setPopup(null);
  };

  const handleHover = (event) => {
    let feature = event.features && event.features[0];
    if(feature && feature.layer.id === "county-join") {
      setTooltip({
        id: feature.properties.GEOID,
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
        stationName: null
      });
    } else if (feature && feature.layer.id === "county-join-names") {
      setTooltip({
        id: feature.properties.geoid,
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
        stationName: null
      });
    } else {
      setTooltip(null);
    }
  };

  useEffect(() => {
    if (area === "bay") {
      setCountyFilter(counties);
    } else if (area === "virginia") {
      setCountyFilter(virginiaCounties);
    } else {
      setCountyFilter(counties.concat(virginiaCounties));
    }

    var viewSetting = getViewSettings();
    setViewport({
      ...viewSetting,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  }, [area]);

  const handlePanning = (view) => {
    let nextView = view;

    if (nextView.latitude > 44 || nextView.latitude < 36) {
      nextView.latitude = viewport.latitude;
    }

    if (nextView.longitude > -71.5 || nextView.longitude < -82) {
      nextView.longitude = viewport.longitude;
    }

    setViewport(nextView);
  };

  return (
    <div id="map-cont">
      <ReactMapGL
        {...viewport}
        width= "100%"
        height= "100%"
        onViewportChange={nextViewport => handlePanning(nextViewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiaWRmY3VydmV0b29sYWRtaW4iLCJhIjoiY2tvdmRnbmZ0MDY4cTJxbXVtd2ljbzM1dCJ9.cJ61fxIj6jjOC21hvg6-Zw"
        mapStyle="mapbox://styles/idfcurvetooladmin/ckove1z9e3ag118pejlfzr2mm"
        onHover={handleHover}
      >
        {/* <Source type = "vector" url = "mapbox://beneck.3at6c9tb" > */}
        <Source type = "vector" url = "mapbox://idfcurvetooladmin.4m2esy6q" >
          <Layer beforeId='states-filtered' {...countyLayer} filter={["in", ["get", "GEOID"], ["literal", countyFilter]]}/>
        </Source>

        {/* <Source type = "vector" url = "mapbox://beneck.3at6c9tb" > */}
        <Source type = "vector" url = "mapbox://idfcurvetooladmin.4m2esy6q" >
          <Layer beforeId='states-filtered' {...countyLines} filter={["in", ["get", "GEOID"], ["literal", countyFilter]]}/>
        </Source>

        {/* <Source type = "vector" url = "mapbox://beneck.5cjncwf0" > */}
        <Source type = "vector" url = "mapbox://idfcurvetooladmin.75wh3fpp" >
          <Layer {...countyNameLayer} filter={["in", ["to-string", ["get", "geoid"]], ["literal", countyFilter]]}/>
        </Source>
        
        <Markers
          onMarkerMouseEnter={handleMarkerMouseEnter}
          onMarkerMouseLeave={handleMarkerMouseLeave}
          scope={area}
        />

        <Legend />
        <NavigationControl className="map-nav" showCompass={false} />

        {popup && <Popup
          tipSize={5}
          anchor="top"
          longitude={parseFloat(popup.longitude)}
          latitude={parseFloat(popup.latitude)}
          closeOnClick={false}
          closeButton={false}
          onClose={() => setPopup(null)}
        >
          <div className="popup-text">
            <div className="popup-title">{popup.station_name}</div>
            <hr/>
            <div className="popup-title">Atlas 14 Change Factors for {data[emission][tp][rp][popup.fips]["name"]} {citiesFips.includes(String(popup.fips)) ? "City" : "County"}:</div>
            <div className="popup-num"><div>10th Percentile:</div> <div>{data[emission][tp][rp][popup.fips]["10%"].toFixed(2)}</div></div>
            <div className="popup-num"><div>25th Percentile:</div> <div>{data[emission][tp][rp][popup.fips]["25%"].toFixed(2)}</div></div>
            <div className="popup-num"><div>Median:</div> <div>{data[emission][tp][rp][popup.fips].median.toFixed(2)}</div></div>
            <div className="popup-num"><div>75th Percentile:</div> <div>{data[emission][tp][rp][popup.fips]["75%"].toFixed(2)}</div></div>
            <div className="popup-num"><div>90th Percentile:</div> <div>{data[emission][tp][rp][popup.fips]["90%"].toFixed(2)}</div></div>
            <hr/>
            <div className="popup-footnote"><i>{"See \"Using the Data\" above for correct and incorrect application of these change factors."}</i></div>
          </div>
        </Popup>}
        {!popup && tooltip && <Popup
          tipSize={5}
          anchor="top"
          longitude={tooltip.longitude}
          latitude={tooltip.latitude}
          closeOnClick={false}
          closeButton={false}
          onClose={() => setPopup(null)}
        >
          <div className="popup-text">
            <div className="popup-title">Atlas 14 Change Factors for {data[emission][tp][rp][tooltip.id]["name"]} {citiesFips.includes(String(tooltip.id)) ? "City" : "County"}:</div>
            <div className="popup-num"><div>10th Percentile:</div> <div>{data[emission][tp][rp][tooltip.id]["10%"].toFixed(2)}</div></div>
            <div className="popup-num"><div>25th Percentile:</div> <div>{data[emission][tp][rp][tooltip.id]["25%"].toFixed(2)}</div></div>
            <div className="popup-num"><div>Median:</div> <div>{data[emission][tp][rp][tooltip.id].median.toFixed(2)}</div></div>
            <div className="popup-num"><div>75th Percentile:</div> <div>{data[emission][tp][rp][tooltip.id]["75%"].toFixed(2)}</div></div>
            <div className="popup-num"><div>90th Percentile:</div> <div>{data[emission][tp][rp][tooltip.id]["90%"].toFixed(2)}</div></div>
            <hr/>
            <div className="popup-footnote"><i>{"See \"Using the Data\" above for correct and incorrect application of these change factors."}</i></div>
          </div>
        </Popup>}
      </ReactMapGL>
    </div>
  );
}

const Markers = ({onMarkerMouseEnter, onMarkerMouseLeave, scope}) => {
  const { current, setCurrent } = useContext(CurrentContext);
  const { setChart } = useContext(ChartContext);

  const handleClick = (id) => {
    setCurrent(id);
    setChart(true);
  };

  return <>
    {Object.entries(stations).map(([id, {fips, latitude, longitude}]) => {
      if ((scope === "both" && (counties.includes(fips) || virginiaCounties.includes(fips))) || (scope === "bay" && counties.includes(fips)) || (scope === "virginia" && virginiaCounties.includes(fips))) {
        return (
          <Marker
            latitude={parseFloat(latitude)}
            longitude={parseFloat(longitude)}
            key={"marker-"+id}
          >
            <div
              className={`marker ${current===id && "current"}`}
              onMouseEnter={() => onMarkerMouseEnter(id)}
              onMouseLeave={onMarkerMouseLeave}
              onClick={() => handleClick(id)}
            >
              <div className="marker-dot"></div>
            </div>
          </Marker>
        );
      } else {
        return "";
      }
    })}
  </>;
};

Markers.propTypes = {
  onMarkerMouseEnter: PropTypes.func.isRequired,
  onMarkerMouseLeave: PropTypes.func.isRequired,
  scope: PropTypes.string.isRequired,
};

export default Map;