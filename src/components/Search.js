import {useState, useContext, useEffect, useMemo} from 'react'
import store from 'store'

import {
  Chip,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core'

import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import '../styles/Search.scss'
import {stations} from '../data'
import {CurrentContext} from '../contexts/CurrentContext'
import {ChartContext} from '../contexts/ChartContext'


function Search() {
  const {current, setCurrent} = useContext(CurrentContext)
  const {setChart} = useContext(ChartContext)
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)
  const [terms, setTerms] = useState("")
  const [favorite, setFavorite] = useState(store.get('favorite'))
  const [favoriteVisible, setFavoriteVisible] = useState(false)

  const handleChange = (event) => {
    setChart(false)
    setTerms(event.target.value)
  }

  const handleChipClick = (id) => {
    setCurrent(id)
    setChart(true)
  }

  const geoDistance = (pt1, pt2) => { // get the distance between two points given latlong
    const lat1 = pt1.lat, lng1 = pt1.lng, lat2 = pt2.lat, lng2 = pt2.lng;
    if ((lat1 === lat2) && (lng1 === lng2)) {
      return 0;
    } else {
      const radlat1 = Math.PI * lat1/180;
      const radlat2 = Math.PI * lat2/180;
      const theta = lng1-lng2;
      const radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  }

  const search = () => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=m1lsJZVvDgjMwJ4bAmiVTdEqoJ9h2DeA&location=${terms.trim()}`)
      .then(res => {
        if(!res.ok) throw new Error('Failed to fetch stations')
        return res.json()
      })
      .then(res => {
        let locations = res.results[0].locations
        let latLngs = locations.map(location => location.latLng)
        let results = {}
        latLngs.forEach(pt1 => {
          Object.entries(stations).forEach(([id, {station_name, latitude, longitude}]) => {
            let pt2 = {
              lat: parseFloat(latitude),
              lng: parseFloat(longitude)
            }
            if (geoDistance(pt1, pt2) <= 10) results[id] = station_name
          })
        })
        setResults(results)
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message)
        setResults("failed")
        setLoading(false)
      })
  }

  const toggleFavorite = (id, name, event) => {
    event.stopPropagation()
    let newFav = {...favorite}
    if(newFav[id]) {
      delete newFav[id]
    } else {
      newFav[id] = name
    }
    setFavorite(newFav)
    store.set('favorite', newFav)
  }

  const limitLabelLength = (name) => {
    let nameArr = name.split('');
    if (nameArr.length > 16) {
      return nameArr.slice(0,13).join('') + '...';
    } else {
      return name;
    }
  };

  const renderResults = () => {
    if (loading) {
      return <CircularProgress />
    } else if (typeof results === "string") {
      return <div>Failed to fetch stations. Please check your Internet connection.</div>
    } else if (Object.entries(results).length>0) {
      return <>{Object.entries(results).map(([id, name]) => <Chip 
        key={id}
        label={limitLabelLength(name)}
        icon={(favorite && favorite[id]) ? (
          <StarIcon onClick={(event) => toggleFavorite(id, name, event)}/>
        ): (
          <StarBorderIcon onClick={(event) => toggleFavorite(id, name, event)}/>
        )}
        color={id === current ? "secondary" : "default"}
        clickable
        onClick = {() => handleChipClick(id)}
      />)}</>
    } else {
      return <div>No matching station found. Try something different.</div>
    }
  }

  const renderFavorite = () => {
    if(!favorite || Object.keys(favorite).length === 0) {
      return <div>You haven't added any stations to your favorite yet.</div>
    } else {
      return <>{Object.entries(favorite).map(([id, name]) => <Chip 
        key={`favorite-${id}`}
        label={limitLabelLength(name)}
        icon={(favorite && favorite[id]) ? (
          <StarIcon onClick={(event) => toggleFavorite(id, name, event)}/>
        ): (
          <StarBorderIcon onClick={(event) => toggleFavorite(id, name, event)}/>
        )}
        color={id === current ? "secondary" : "default"}
        clickable
        onClick = {() => handleChipClick(id)}
      />)}</>
    }
  }

  useEffect(() => { // get a list of locations when the search term changes
    setLoading(true)
    setResults({})
    const timer = setTimeout(search, 1000)
    return () => clearTimeout(timer)
  }, [terms.trim()])

  return (
    <>
      <div id="search-cont" className="card">
        <TextField
          label="Search"
          placeholder="Enter zip code or county name"
          // helperText="Type in zip codes or names to find stations"
          fullWidth
          inputMode="search"
          onChange={handleChange}
          value = {terms}
          // onFocus={() => setFavoriteVisible(true)}
          // onBlur={() => setFavoriteVisible(false)}
        />
      </div>
      {/* <div id="search-result">
        {terms.trim().length>0 && <div id="result-wrapper"  className="card">
          {renderResults()}
        </div>}
        {favoriteVisible && <div id="favorite-wrapper" className="card">
          <Typography style = {{flexBasis: "100%"}} variant="caption">My Favorite Stations</Typography>
          {renderFavorite()}
        </div>}
      </div> */}
      <div id="search-result">
        <div id="srw" className="card">
          {terms.trim().length>0 && <div id="result-wrapper">
            <Typography style = {{flexBasis: "100%"}} variant="caption">Search Results</Typography>
            {renderResults()}
          </div>}
          <div id="favorite-wrapper">
            <Typography style = {{flexBasis: "100%"}} variant="caption">My Favorite Stations</Typography>
            {renderFavorite()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search