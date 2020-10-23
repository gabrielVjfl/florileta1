import React from 'react'

import Logo from '../../images/reciclagem-logo.png'

import Local from '../../images/gps.png'

import './Maps.css'

import {FaArrowLeft} from 'react-icons/fa'

import Leaflet from 'leaflet'

import {Map, TileLayer, Marker, Popup} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import {FiPlus, FiArrowRight} from 'react-icons/fi'


import {Link} from 'react-router-dom'

const MapIcon = Leaflet.icon({
    iconUrl: Local,
 
     iconSize: [58, 68],
     iconAnchor: [29,68],
     popupAnchor: [0, -30]
     
 })



const Maps = () => {

    return (
    <div id="template_maps">
        <aside>
        <Link to="/"><button className="btn btn-warning">
            <FaArrowLeft></FaArrowLeft></button></Link>
            <header>
                <br/>
            <img src={Logo} height="80px" width="80px"/>
            <h2>Florileta</h2>
           <h3>Escolha um ponto de coleta no mapa</h3>
           <p>A natureza agradece!</p>
            </header>
            <footer>
                <strong>Florianópolis</strong>
                <span>Santa Catarina</span>
            </footer>
        </aside>

        <Map
   center={[-27.5884465,-48.506986]} // ou usar mapbox
   zoom={11}
   style={{width: '100%', height: '100%'}}
   >
       <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>

               <Marker position={[-27.5884465,-48.506986]}
               icon={MapIcon}
               
              >
           <Popup closeButton={false} minWidth={140} maxWidth={140} className="map-popup">
                qualquercoisa
             <a href={`/orfanato/1`}>
            <FiArrowRight size={20} color="white"/>
             </a>
           </Popup>
        </Marker>
   </Map>

    </div>
    )
}

export default Maps