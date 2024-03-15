
import React from 'react'
import { Marker, Popup} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function Marker2({latitud, longitud, message}) {
  return (
    <Marker icon={
        new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // Cambiar a una imagen roja
          iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            shadowSize: [41, 41],
        })
    } position={[latitud,longitud]}>
         <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
  )
}
