'use client';
import React, { useState } from 'react';
import Map, { Marker, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface SearchProps {
  onSearch: (location: { place: string, lat: number; long: number }) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ place_name: string; center: [number, number] }[]>([]);

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?autocomplete=true&access_token=pk.eyJ1IjoiamFjb2JnZXJ2aW4iLCJhIjoiY2x6bWQyb2k1MDhodjJrczh2aGI3cWtsMCJ9.cBMDgUQ5BNx1ZWE_WP5glQ`
    );
    const data = await res.json();
    setSuggestions(data.features);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (suggestions.length > 0) {
      const location = suggestions[0];

      onSearch({
        place: location.place_name,
        lat: location.center[1],
        long: location.center[0],
      });
      setQuery(location.place_name); 
      setSuggestions([]); 
    }
  };

  const handleSuggestionClick = (suggestion: { place_name: string; center: [number, number] }) => {
    onSearch({
        place: suggestion.place_name,
        lat: suggestion.center[1],
        long: suggestion.center[0],
    });
    setQuery(suggestion.place_name); 
    setSuggestions([]); 
  };

  return (
    <div className='gap-2 border-box'>
      <form onSubmit={handleSearch} className='flex flex-row items-center relative'>
        <input
          className='bg-[#282828] text-white border border-[#3f3f3f] rounded'
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          placeholder="Search location..."
          style={{ padding: '8px', width: '100%', outline: "none" }}
        />
        <button className=' bg-[#292929] hover:bg-[#3f3f3f] absolute right-1.5 rounded p-1 transition-all' type="submit">Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul 
        style={{
          position: 'relative',
          top: '10px',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          zIndex: 1000,
          listStyleType: 'none',
          padding: '0',
          margin: '0'
        }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc',
                backgroundColor: index % 2 === 0 ? '#000' : '#000'
              }}
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
