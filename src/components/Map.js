import {useState, useContext} from 'react'
import ReactMapGL, {Source, Layer, Marker, Popup} from 'react-map-gl'

import '../styles/Map.scss'
import {data, stations, counties, virginaCounties} from '../data'
import {OptionsContext} from '../contexts/OptionsContext'
import {ChartContext} from '../contexts/ChartContext'
import {CurrentContext} from '../contexts/CurrentContext'

function Map() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 39.25,
    longitude: -76.25,
    zoom: 6.1,
    minZoom: 6.1,
    bearing: -10,
    pitch: 40
  });

  const [popup, setPopup] = useState(null)
  const [tooltip, setTooltip] = useState(null)

  const {options: {emission, rp, tp}} = useContext(OptionsContext)
  

  const currentData = data[emission][tp][rp]
  
  let max = Math.ceil(currentData.max*10)/10
  let min = Math.floor(currentData.min*10)/10
  max = 1+Math.max(max-1, 1-min)
  min = 1-Math.max(max-1, 1-min)

  let colorExpression = ['match', ['get', 'GEOID']]
  Object.entries(currentData).forEach(([id, {name, mean}]) => {
    let color
    if(mean > 1) {
      color = `hsla(160, ${(mean-1)/(max-1)*100}%, ${(mean-1)/(max-1)*70}%, 1)`
    } else if (mean<1) {
      color = `hsla(40, ${(mean-1)/(min-1)*100}%, ${(mean-1)/(min-1)*70}%, 1)`
    } else {
      color = `hsla(100, 0%, 40%, 1)`
    }
    colorExpression.push(id, color)

  })

  colorExpression.push("rgba(0, 0, 0, 0)")

  const countyLayer = {
    id: "counties",
    type: "fill",
    'source-layer': "cf_rcp45_2020-2070_median_2-8ekv7r",
    paint: {
      "fill-color": colorExpression || "rgba(0, 0, 0, 0)",
      "fill-outline-color": "rgba(100,100,100,1)"
    }
  }

  const countyNameLayer = {
    id: "county-names",
    type: "symbol",
    'source-layer': "cf_rcp45_2020-2070_median_2-8ekv7r",
    layout: {
      'text-field': ['get', 'NAME'],
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

  const handleHover = event => {
    let feature = event.features && event.features[0]
    if(feature && (feature.layer.id === "counties" || feature.layer.id === "county-names")) {
      setTooltip({
        id: feature.properties.GEOID,
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      })
    } else {
      setTooltip(null)
    }
  }

  return (
    <div id="map-cont">
      <ReactMapGL
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        // mapboxApiAccessToken="pk.eyJ1IjoiYWRyaWVuemhlbmciLCJhIjoiY2tkamI5am9iMDN6NjJxbW8xZmY4d2puYiJ9.nQG7j4_lTdRg0jdfZMTWlw"
        // mapStyle="mapbox://styles/adrienzheng/ckidysz96357819k58txti52f"
        mapboxApiAccessToken="pk.eyJ1IjoiYmVuZWNrIiwiYSI6ImNrbTBvNWNtdTB1eXUyb21yeWhpbWZrYWMifQ.rSYtPIiS9ZbnnCdSbtm4wQ"
        mapStyle="mapbox://styles/beneck/ckm0vcgpk82b117nlfwc1ixt8"
        onHover={handleHover}
      >
        <Source type = "vector" url = "mapbox://adrienzheng.604t4hsd">
          <Layer beforeId="waterway-label" {...countyLayer} filter={["in", ["get", "GEOID"], ["literal", counties]]}/>
        </Source>

        <Source type = "vector" url = "mapbox://adrienzheng.604t4hsd">
          <Layer beforeId="waterway-label" {...countyNameLayer} filter={["in", ["get", "GEOID"], ["literal", counties]]}/>
        </Source>
        <Markers
          onMarkerMouseEnter={handleMarkerMouseEnter}
          onMarkerMouseLeave={handleMarkerMouseLeave}
        />
        <div id="legend">
          <div id="legend-color" style={{
            backgroundImage: `linear-gradient(270deg, hsla(160, 100%, 70%, 1), hsla(100, 0%, 40%, 1), hsla(40, 100%, 70%, 1))`
          }}>
            <div className="legend-text">{min}</div>
            <div className="legend-text">1.0</div>
            <div className="legend-text">{max}</div>
          </div>
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

const Markers = ({onMarkerMouseEnter, onMarkerMouseLeave}) => {
  const {current, setCurrent} = useContext(CurrentContext)
  const {chart, setChart} = useContext(ChartContext)

  const handleClick = (id) => {
    setCurrent(id)
    setChart(true)
  }

  return <>
    {Object.entries(stations).map(([id, {latitude, longitude}]) => 
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
      </Marker>)}
    </>
}

export default Map