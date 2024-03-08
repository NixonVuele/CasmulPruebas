
import React, { use } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import Marker2 from './Marker2'
import 'leaflet/dist/leaflet.css'
import '../../globals.css'


export default function Mapa({ users,selectedUserId}) {
  console.log('estoy desde mapa')
  
  console.log(selectedUserId)
  console.log(users)
    // Verificar si el arreglo de usuarios está vacío
  if (!Array.isArray(users) || users.length === 0) {
    return renderEmptyMap();
  }
  //console.log(users.map(user=> user ))
  let [users1] =[]
  if (!Array.isArray(users)) {
    users = [users]; // Envolver en un arreglo
  }
  let polyline2 = []
  let coord= []
  if(users !== undefined){
    console.log(users)

    const user = users.find(user => user.id === selectedUserId);
    console.log(user)

    // Si se encuentra el usuario, mapea sus ubicaciones, de lo contrario, devuelve undefined
    polyline2 = user ? user.locations.map(location => [location.latitude, location.longitude]) : undefined;    
    console.log(polyline2)
    coord = polyline2[0];
  }
  console.log(coord)
  
  
  
  //const allLocations = users.flatMap(user => user.locations);
  //console.log(allLocations)
  //const polyline2 = users.map(user => user.locations.map(location => [location.latitude, location.longitude]));

  //console.log(polyline2); //
  //const coord = polyline2[0];
    const polyline = [
      [-4.015581, -79.20783],
      [-4.0735965,-79.3137789],
      [-3.98652, -79.35912],
    ]
    const fillBlueOptions = { fillColor: 'blue' }
    const limeOptions = { color: 'red' }
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
  function renderEmptyMap() {
    return (
      <MapContainer style={{ height: '100vh', width: '100vw' }} center={[0, 0]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    );
  }
}
