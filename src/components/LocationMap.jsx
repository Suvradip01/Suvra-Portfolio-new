"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LOCATIONS = [
  { name: "Siliguri, India", coords: [26.7100, 88.4300], zoom: 11 },
  { name: "Kolkata, India", coords: [22.5726, 88.3639], zoom: 11 },
  { name: "Bengaluru, India", coords: [12.9716, 77.5946], zoom: 11 },
  { name: "Mumbai, India", coords: [19.0760, 72.8777], zoom: 11 },
  { name: "Delhi, India", coords: [28.7041, 77.1025], zoom: 11 },
  { name: "Greenland", coords: [71.7069, -42.6043], zoom: 5 },
  { name: "London, UK", coords: [51.5072, -0.1276], zoom: 11 },
  { name: "New York, USA", coords: [40.7128, -74.0060], zoom: 11 },
  { name: "Antarctica", coords: [-82.8628, 135.0000], zoom: 4 },
];

const CYCLE_MS = 3500;

// Recenters the underlying map whenever the active location changes.
function FlyToController({ index }) {
  const map = useMap();
  useEffect(() => {
    const { coords, zoom } = LOCATIONS[index];
    map.flyTo(coords, zoom, { duration: 1.8 });
  }, [index, map]);
  return null;
}

export function LocationMap({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % LOCATIONS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const current = LOCATIONS[index];

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <MapContainer
        center={current.coords}
        zoom={current.zoom}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        className="w-full h-full"
        style={{ background: "#1a1a1f" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        <FlyToController index={index} />
      </MapContainer>

      {/* Fixed center pin — stays put while the map slides underneath it */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-[1000] flex flex-col items-center">
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500 border-2 border-white shadow-lg" />
        </span>
        <div className="w-0.5 h-3 bg-purple-500/70" />
      </div>

      {/* Vignette so the tiles blend into the dark card instead of looking pasted on */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div
        key={current.name}
        className="absolute bottom-4 right-4 text-white/90 text-xs md:text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full animate-fadeIn z-[1000]"
      >
        {current.name}
      </div>

      {/* Required minimal attribution for the free CartoDB/OSM tiles */}
      <div className="absolute bottom-1 left-2 text-[9px] text-white/30 z-[1000] pointer-events-none opacity-0">
        © OpenStreetMap © CARTO
      </div>
    </div>
  );
}
