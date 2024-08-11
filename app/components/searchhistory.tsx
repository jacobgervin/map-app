'use client';
import React from 'react';

interface SearchHistoryProps {
  prevLocations: { place: string; lat: number; long: number; }[];
  applyPrev: (location: { place: string, lat: number; long: number }) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ prevLocations, applyPrev }) => {

  return (
    <div className='flex flex-col gap-3 max-h-full border-box overflow-hidden divide-y divide-neutral-700'>
      <p className='text-sm md:text-lg font-semibold'>Search history:</p>
      {prevLocations.length <= 0 ? 
      <div className='p-4'><p className='text-sm font-semibold text-white'>No search history found.</p> </div> 
      :       
      <ul className='flex flex-col overflow-y-auto divide-y divide-neutral-700 h-full'> 
        {prevLocations.map((location, index) => (
          <li onClick={() =>applyPrev(location)} key={index} className='pl-4 pr-4 pt-3 pb-3 rounded cursor-pointer hover:bg-[#282828] transition-all'>
            <div>
                <p className='text-sm font-semibold'>{location.place}</p>
                <p className='text-xs'>({location.lat}, {location.long})</p>
            </div>
          </li>
        ))}
      </ul> 
      }
    
    </div>
  );
};

export default SearchHistory;
