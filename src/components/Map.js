import {useState, useEffect, useContext} from 'react'
import ReactMapGL, {NavigationControl, Source, Layer, Marker, Popup, FlyToInterpolator} from 'react-map-gl'

import '../styles/Map.scss'
import {data, stations, counties, virginiaCounties} from '../data'
import {OptionsContext} from '../contexts/OptionsContext'
import {ChartContext} from '../contexts/ChartContext'
import {CurrentContext} from '../contexts/CurrentContext'

function Map() {
  const [viewport, setViewport] = useState({
    // width: "100%",
    // height: "100%",
    latitude: 39.25,
    longitude: -76.25,
    zoom: 5,
    minZoom: 5.8,
    bearing: -10,
    pitch: 40,
  });

  
  const [popup, setPopup] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const [countyFilter, setCountyFilter] = useState(counties)
  
  const {options: {emission, rp, tp, area}} = useContext(OptionsContext)
 
  const currentData = data[emission][tp][rp]
  
  let max = Math.ceil(currentData.max*10)/10
  let min = Math.floor(currentData.min*10)/10

  max = 1+Math.max(max-1, 1-min)
  min = 1-Math.max(max-1, 1-min)

  // const calcS = (mean) => {
  //   let result = ((mean - min) / (max - min) * 25);
  //   return result
  // };

  // const calcL = (mean) => {
  //   let result = ((mean - min) / (max - min) * 50);
  //   return result
  // };


  let colorExpression = ['match', ['get', 'FIPS']]
  Object.entries(currentData).forEach(([id, {name, mean}]) => {
    let color


    // if(mean > 1) {
    //   color = `hsla(160, ${(mean-1)/(max-1)*100}%, ${(mean-1)/(max-1)*70}%, 1)`
    // } else if (mean<1) {
    //   color = `hsla(40, ${(mean-1)/(min-1)*100}%, ${(mean-1)/(min-1)*70}%, 1)`
    // } else {
    //   color = `hsla(100, 0%, 40%, 1)`
    // }

    if(mean > 1) {
      color = `hsla(110, ${(mean-1) / (max-1) * 25 + 75}%, ${50 - (mean-1) / (max-1) * 50}%, 1)`
    } else if (mean<1) {
      color = `hsla(40, ${(mean-1) / (min-1) * 25 + 75}%, ${(mean-1) / (min-1) * 20 + 50}%, 1)`
    } else {
      color = `hsla(110, 75%, 50%, 1)`
    }

    // backgroundImage: `linear-gradient(270deg, hsla(110, 100%, 0%, 1), hsla(110, 75%, 50%, 1), hsla(40, 100%, 70%, 1))`
    // color = `hsla(110, ${calcS(mean) + 75}%, ${50 - calcL(mean)}%, 1)`

    colorExpression.push(id, color)
  })

  colorExpression.push("rgba(0, 0, 0, 0)")

  const countyLayer = {
    id: "county-join",
    type: "fill",
    'source-layer': 'historical_pres_elections_county',
    // 'source-layer': "cf_rcp45_2020-2070_median_2-8ekv7r",
    paint: {
      "fill-color": colorExpression,
      "fill-outline-color": "rgba(100,100,100,1)"
      // "fill-color": "rgba(0, 0, 0, 1)",
      // "fill-outline-color": "rgba(255,255,255,1)"
    }
  }

  const countyNameLayer = {
    id: "county-join-names",
    type: "symbol",
    'source-layer': "historical_pres_elections_county_points",
    layout: {
      'text-field': ['get', 'name'],
      'text-size': 12, 
    },
    paint: {
      'text-color': "#dddddd"
    }
  }

  const handleMarkerMouseEnter = (id) => {
    setPopup(stations[id])
    // setTooltip(null)
  }

  const handleMarkerMouseLeave = () => {
    setPopup(null)
  }

  const handleHover = (event) => {
    let feature = event.features && event.features[0]
    if(feature && (feature.layer.id === "county-join" || feature.layer.id === "county-join-names")) {
      setTooltip({
        id: feature.properties.FIPS,
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      })
    } else {
      setTooltip(null)
    }
  };

  // Only needed if we decide to do something when clicking the counties
  // const handleClick = (event) => {
  //   console.log(event);
  // };

  const getViewSettings = () => {
    let viewWidth = document.querySelector('html').clientWidth;
    let viewHeight = document.querySelector('html').clientHeight;
    let lat, long, zoom;

    if (area === 'bay') {
      lat = 39.25;
      long = -78.1;
      zoom = 6.0;
  
      if (viewHeight <= 950 && viewHeight > 850) {
        zoom = 5.8;
      } else if (viewHeight <= 850) {
        zoom = 5.6;
      }
  
      if (viewWidth <= 1255 && viewWidth > 1150 && zoom >= 6.0) {
        zoom = 5.8
      } else if (viewWidth <= 1150 && viewWidth > 1055 && zoom >= 5.8) {
        zoom = 5.6
      } else if (viewWidth <= 1055 && zoom >= 5.6) {
        zoom = 5.5
        long = -78.4
      }

    } else {
      lat = 37.2;
      long = -79.7;
      zoom = 6.5;
  
      if (viewWidth <= 1800 && viewWidth > 1570) {
        zoom = 6.3;
      } else if (viewWidth <= 1570 && viewWidth > 1375) {
        zoom = 6.1;
      } else if (viewWidth <= 1375 && viewWidth > 1260) {
        zoom = 5.9;
      } else if (viewWidth <= 1260 && viewWidth > 1185) {
        zoom = 5.7;
      } else if (viewWidth <= 1185 && viewWidth > 1060) {
        zoom = 5.5;
      } else if (viewWidth <= 1060) {
        zoom = 5.3;
        long = -80.2;
      }
    }

    return {
      latitude: lat,
      longitude: long,
      zoom: zoom,
      minZoom: zoom
    }
  };

  useEffect(() => {
    if (area === 'virginia') {
      setCountyFilter(virginiaCounties);
    } else {
      setCountyFilter(counties);
    }

    var viewSetting = getViewSettings();
    setViewport({
      ...viewSetting,
      bearing: -10,
      pitch: 40,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    })
  }, [area]);

  // if (props.scope === 'virginia') {
  //   var countyFilter = virginiaCounties;
  // } else {
  //   var countyFilter = counties;
  // }

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
        // mapboxApiAccessToken="pk.eyJ1IjoiYWRyaWVuemhlbmciLCJhIjoiY2tkamI5am9iMDN6NjJxbW8xZmY4d2puYiJ9.nQG7j4_lTdRg0jdfZMTWlw"
        // mapStyle="mapbox://styles/adrienzheng/ckidysz96357819k58txti52f"
        mapboxApiAccessToken="pk.eyJ1IjoiYmVuZWNrIiwiYSI6ImNrbTBvNWNtdTB1eXUyb21yeWhpbWZrYWMifQ.rSYtPIiS9ZbnnCdSbtm4wQ"
        mapStyle="mapbox://styles/beneck/ckm0vcgpk82b117nlfwc1ixt8"
        onHover={handleHover}
        // Only needed if we decide to so something when clicking on counties
        // onClick={handleClick}
      >
        <Source type = "vector" url = "mapbox://mapbox.hist-pres-election-county" >
          {/* <Layer beforeId='watershed-boundary' {...countyLayer} /> */}
          <Layer beforeId='watershed-boundary' {...countyLayer} filter={["in", ["get", "FIPS"], ["literal", countyFilter]]}/>
        </Source>

        <Source type = "vector" url = "mapbox://mapbox.hist-pres-election-county-points" >
          <Layer {...countyNameLayer} filter={["in", ["get", "FIPS"], ["literal", countyFilter]]}/>
          {/* <Layer {...countyNameLayer} /> */}
        </Source>

        {/* <Source type = "vector" url = "mapbox://adrienzheng.604t4hsd">
          <Layer beforeId="waterway-label" {...countyLayer} filter={["in", ["get", "GEOID"], ["literal", counties]]}/>
          </Source>
          
          <Source type = "vector" url = "mapbox://adrienzheng.604t4hsd">
          <Layer beforeId="waterway-label" {...countyNameLayer} filter={["in", ["get", "GEOID"], ["literal", counties]]}/>
        </Source> */}
        
        
        <Markers
          onMarkerMouseEnter={handleMarkerMouseEnter}
          onMarkerMouseLeave={handleMarkerMouseLeave}
          scope={area}
          // scope={props.scope}
        />

        <div className="legend-controls-container">
          <div id="legend">
            <div id="legend-color" style={{
              backgroundImage: `linear-gradient(270deg, hsla(110, 100%, 0%, 1), hsla(110, 75%, 50%, 1), hsla(40, 100%, 70%, 1))`
              // backgroundImage: `linear-gradient(270deg, hsla(110, 100%, 0%, 1), hsla(110, 75%, 50%, 1))`
              // backgroundImage: `linear-gradient(270deg, hsla(160, 100%, 70%, 1), hsla(100, 0%, 40%, 1), hsla(40, 100%, 70%, 1))`
            }}>
              <div className="legend-text">{min}</div>
              <div className="legend-text">1.0</div>
              <div className="legend-text">{max}</div>
            </div>
          </div>
          <NavigationControl className="map-nav" showCompass={false} />
        </div>
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
            <div className="popup-title">Station: {popup.station_name}, {popup.state}</div>
            <div className="popup-num">10th: {data[emission][tp][rp][popup.fips]["10%"]}</div>
            <div className="popup-num">25th: {data[emission][tp][rp][popup.fips]["25%"]}</div>
            <div className="popup-num">Mean: {data[emission][tp][rp][popup.fips].mean}</div>
            <div className="popup-num">75th: {data[emission][tp][rp][popup.fips]["75%"]}</div>
            <div className="popup-num">90th: {data[emission][tp][rp][popup.fips]["90%"]}</div>
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
            <div className="popup-title">County: {data[emission][tp][rp][tooltip.id]["name"]}</div>
            <div className="popup-num">10th: {data[emission][tp][rp][tooltip.id]["10%"]}</div>
            <div className="popup-num">25th: {data[emission][tp][rp][tooltip.id]["25%"]}</div>
            <div className="popup-num">Mean: {data[emission][tp][rp][tooltip.id].mean}</div>
            <div className="popup-num">75th: {data[emission][tp][rp][tooltip.id]["75%"]}</div>
            <div className="popup-num">90th: {data[emission][tp][rp][tooltip.id]["90%"]}</div>
          </div>
        </Popup>}
      </ReactMapGL>
    </div>
  );
}

const Markers = ({onMarkerMouseEnter, onMarkerMouseLeave, scope}) => {
  const {current, setCurrent} = useContext(CurrentContext)
  const {chart, setChart} = useContext(ChartContext)

  const handleClick = (id) => {
    setCurrent(id)
    setChart(true)
  }

  return <>
    {Object.entries(stations).map(([id, {fips, latitude, longitude}]) => {
      if ((scope === 'bay' && counties.includes(fips)) || (scope === 'virginia' && virginiaCounties.includes(fips))) {
        return (
          <Marker
            latitude={parseFloat(latitude)}
            longitude={parseFloat(longitude)}
            key={'marker-'+id}
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
        return '';
      }
    })}
  </>
}

export default Map