import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Location = () => {
  const center = { lat: 37.7749, lng: -122.4194 }; // Example coordinates (San Francisco)

  return (
    <div className="hidden md:flex flex-col gap-2 bg-white rounded-lg px-4 shadow-md">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Location</p>
        <button className="bg-blue-600 p-1 px-3 text-white font-bold rounded-md text-sm hover:bg-blue-700">
          View on Google Maps
        </button>
      </div>
      <div className="h-64 w-full rounded-md">
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={center}
            zoom={12}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Location;
