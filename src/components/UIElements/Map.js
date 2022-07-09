import React from 'react'

import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import styles from './Map.module.css'
<link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
/>
const Map = (props) => {
    const { name, center, zoom } = props

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [24, 36],
        iconAnchor: [12, 36],
    })
    L.Marker.prototype.options.icon = DefaultIcon

    return (
        <div className={styles.map}>
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={zoom}
                scrollWheelZoom={false}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                />
                <Marker position={[center.lat, center.lng]}>
                    <Popup>{name}</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
