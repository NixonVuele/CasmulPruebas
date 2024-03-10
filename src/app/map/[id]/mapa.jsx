'use client'
import React, { use, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import Marker2 from './Marker2'
import 'leaflet/dist/leaflet.css'
import '../../globals.css'
import { useMapEvent ,useMap} from 'react-leaflet';

function CentradoRuta({ coordenada }) {
  const map = useMap();
  console.log(coordenada)
  
  // Esta función se ejecutará cada vez que la coordenada cambie
  useEffect(() => {
    if (coordenada) {
      map.setView(coordenada, map.getZoom());
    }
  }, [coordenada, map]);

  return null;
}


export default function Mapa({ users,selectedUserId}) {
  console.log('estoy desde mapa')
  
  console.log(selectedUserId)
  console.log(users)
    // Verificar si el arreglo de usuarios está vacío
  if (!Array.isArray(users) || users.length === 0) {
    return renderEmptyMap();
  }

  if (!Array.isArray(users)) {
    users = [users]; // Envolver en un arreglo
  }
  let polyline2 = []
  let coord= []
  let latitudInicial=0;
  let longitudInicial=0;
  let latitudFinal= 0;
  let longitudFinal= 0;
  if(users !== undefined){
    const user = users.find(user => user.id === selectedUserId);
    // Si se encuentra el usuario, mapea sus ubicaciones, de lo contrario, devuelve undefined
    polyline2 = user ? user.locations.map(location => [location.latitude, location.longitude]) : undefined;    
    coord = polyline2[0];
    latitudInicial= coord[0];
    longitudInicial= coord[1];
    const ultima_coordenada = polyline2[polyline2.length - 1]; 
    latitudFinal = ultima_coordenada[0];
    longitudFinal = ultima_coordenada[1];
  }
    const fillBlueOptions = { fillColor: 'blue' }
    const limeOptions = { color: 'red' }
  return (
    <MapContainer style={{
        height: '100vh',
        width: '100vw'
    }} center={coord} zoom={15} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CentradoRuta coordenada={coord} />
        <Marker2 latitud={latitudInicial} longitud={longitudInicial}></Marker2>
        <Marker2 latitud={latitudFinal} longitud={longitudFinal}></Marker2>
        
        <Polyline pathOptions={limeOptions} positions={polyline2} />
    </MapContainer>    
  )
  
  function renderEmptyMap() {
    return (
      <>
      <MapContainer style={{ height: '100vh', width: '100vw' }} center={[0, 0]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <centradoRuta> </centradoRuta>
      </>
    );
  }
}
