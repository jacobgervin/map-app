'use client';
import React, {useEffect, useRef} from 'react';
import Map, { Marker, ViewState, useMap, MapRef, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  location: {
    lat: number;
    long: number;
  };
}

const LocationMap: React.FC<MapProps> = ({ location }) => {
    const {current: map} = useMap();
    const mapRef = useRef<MapRef>(null);
    const PaddingOptions = {
        top: 0,
        bottom: 0,
        left: 0,  
        right: 0, 
      };

  const [viewport, setViewport] = React.useState<ViewState>({
    longitude: location.long,
    latitude: location.lat,
    zoom: 16,
    bearing: 0,
    pitch: 30,
    padding: PaddingOptions
  });
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [location.long, location.lat],
        essential: true,
      });
    }
  }, [location]);
  return (
    <div className='h-full md:h-screen w-full p-1 border-box'>
    <Map
      ref={mapRef}
      initialViewState={viewport}
      style={{ borderRadius: "8px", height: "100%", width: "100%"}}
      mapboxAccessToken="pk.eyJ1IjoiamFjb2JnZXJ2aW4iLCJhIjoiY2x6bWQyb2k1MDhodjJrczh2aGI3cWtsMCJ9.cBMDgUQ5BNx1ZWE_WP5glQ"
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onMove={(evt) => setViewport(evt.viewState)}
    >
      <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />
        <Layer id="terrain" type="hillshade" source="mapbox-dem" />
        
        <Layer
          id="3d-buildings"
          type="fill-extrusion"
          source="composite"
          source-layer="building"
          minzoom={15}
          paint={{
            'fill-extrusion-color': '#292929',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6
          }}
        />
      <Marker longitude={location.long} latitude={location.lat} color="#382bf0" />
    </Map>
    </div>
  );
};

export default LocationMap;
