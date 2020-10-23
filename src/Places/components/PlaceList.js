import React from 'react'
import './PlaceList.css'
import PlaceItem from './PlaceItem';
const PlaceList=({places})=> {
    return (
        <ul className="place-list">
          {places.map((place)=>(
              <PlaceItem  place={place}/>
          ))}
        </ul>
    )
}

export default PlaceList
