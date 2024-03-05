
import React, { use } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import Marker2 from './Marker2'
import 'leaflet/dist/leaflet.css'
import '../../globals.css'


export default function Mapa({ users }) {
  //console.log('estoy desde mapa')
  //console.log(users)
  //console.log(users.map(user=> user ))
  let polyline2 = []
  if(users !== undefined){
    polyline2 = users.map(user => user.locations.map(location => [location.latitude, location.longitude]));
    
  }
  //console.log(polyline2)
  
  
  
  //const allLocations = users.flatMap(user => user.locations);
  //console.log(allLocations)
  //const polyline2 = users.map(user => user.locations.map(location => [location.latitude, location.longitude]));

  //console.log(polyline2); //

    const coord =[-4.015581,-79.20783];
    const polyline = [
      [-4.015581, -79.20783],
      [-4.0735965,-79.3137789],
      [-3.98652, -79.35912],
    ]
    const fillBlueOptions = { fillColor: 'blue' }
    const limeOptions = { color: 'gray' }
    const latitudInicial= -4.015581;
    const longitudInicial= -79.20783;
    const latitudFinal= -3.98652;
    const longitudFinal= -79.35912;
  return (
    <MapContainer style={{
        height: '100vh',
        width: '100vw'
    }} center={coord} zoom={15} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker2 latitud={latitudInicial} longitud={longitudInicial}></Marker2>
        <Marker2 latitud={latitudFinal} longitud={longitudFinal}></Marker2>
        
        <Polyline pathOptions={limeOptions} positions={polyline2} />
    </MapContainer>
  )
}
