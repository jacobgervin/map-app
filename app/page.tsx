'use client'
import LocationMap from "./components/map";
import { useState } from "react";
export default function Home() {

  const [location, setLocation] = useState({
    lat: 55.647260, 
    long: 12.284460,
  });

  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LocationMap location={location}/>
    </main>
  );
}
