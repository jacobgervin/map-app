'use client'
import LocationMap from "./components/map";
import { useEffect, useState } from "react";
import SearchBar from "./components/searchbar";
import SearchHistory from "./components/searchhistory";

export default function Home() {
  const [prevLocations, setPrevLocations] = useState<{ place: string; lat: number; long: number; }[]>([]);
  const [location, setLocation] = useState({
    place: "", 
    lat: 55.647260, 
    long: 12.284460,
  });

  useEffect(() => {
    if (location.place) {
      setPrevLocations((prev) => [location, ...prev]);
    }
  }, [location]);

  return (
    <main className="flex h-screen flex-col md:flex-row items-center justify-center box-border overflow-hidden">
      <div className="h-1/2 flex flex-col md:h-screen w-screen md:w-1/3 box-border p-4 gap-5">
        <SearchBar onSearch={setLocation}/>
        <SearchHistory prevLocations={prevLocations} applyPrev={setLocation}/> 
      </div>
      <div className="h-1/2 md:h-full w-screen md:w-2/3 box-border flex flex-row justify-end">
        <LocationMap location={location}/>
      </div>
    </main>
  );
}
