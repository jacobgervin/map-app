'use client';
import React from 'react';
import Map, { Marker, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  location: {
    lat: number;
    long: number;
  };
}

const LocationMap: React.FC<MapProps> = ({ location }) => {
    const PaddingOptions = {
        top: 50,    // 50px padding on top
        bottom: 50, // 50px padding on bottom
        left: 50,   // 50px padding on left
        right: 50,  // 50px padding on right
      };

  const [viewport, setViewport] = React.useState<ViewState>({
    longitude: location.long,
    latitude: location.lat,
    zoom: 12,
    bearing: 2,
    pitch: 1,
    padding: PaddingOptions
  });

  return (
    <Map
      initialViewState={viewport}
      style={{ width: 600, height: 400 }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onMove={(evt) => setViewport(evt.viewState)}
    >
      <Marker longitude={location.long} latitude={location.lat} color="red" />
    </Map>
  );
};

export default LocationMap;
