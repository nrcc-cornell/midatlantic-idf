import {useState, useContext} from 'react'
import store from 'store'

import {
  Chip,
  Typography
} from '@material-ui/core'

import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import '../styles/Favorites.scss'
import {stations} from '../data'
import {CurrentContext} from '../contexts/CurrentContext'
import {ChartContext} from '../contexts/ChartContext'


export default function Favorites() {
  const {current, setCurrent} = useContext(CurrentContext)
  const {setChart} = useContext(ChartContext)
  const [favorite, setFavorite] = useState(store.get('favorite'))


  const handleChipClick = (id) => {
    setCurrent(id)
    setChart(true)
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

  const renderFavorite = () => {
    if((!favorite || Object.keys(favorite).length === 0) && !current) {
      return <div className="favorites-placeholder-text">Please select a station to start adding favorites.</div>
    } else if ((!favorite || Object.keys(favorite).length === 0) && current) {
      return <div className="favorites-placeholder-text">To add this station to your favorites click the star.</div>
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

  const renderSelected = () => {
    let name = stations[current]["station_name"];
    
    return (
    <div id="current-station">
      <Chip 
        label={limitLabelLength(name)}
        icon={(favorite && favorite[current]) ? (
          <StarIcon onClick={(event) => toggleFavorite(current, name, event)}/>
        ): (
          <StarBorderIcon onClick={(event) => toggleFavorite(current, name, event)}/>
        )}
        color="secondary"
        clickable
        onClick = {() => handleChipClick(current)}
      />
    </div>)
  }

  return (
    <>
      {current && <div id="selected-cont" className="card">
        <div id="current-wrapper">
          <Typography style = {{flexBasis: "100%"}} variant="caption">Currently Selected</Typography>
          {renderSelected()}
        </div>
      </div>}
      
      <div id="favorites-cont">
        <div id="srw" className="card">
          <Typography style = {{flexBasis: "100%"}} variant="caption">Favorited Stations</Typography>
          {renderFavorite()}
        </div>
      </div>
    </>
  )
}