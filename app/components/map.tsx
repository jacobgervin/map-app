'use client'
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function LocationMap() {
    return (
    <Map
        initialViewState={{
        longitude: 12.284460,
        latitude: 55.647260,
        zoom: 6
        }}
        style={{width: 600, height: 400}}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        mapStyle="mapbox://styles/mapbox/dark-v11"
    />
    );
  }
  