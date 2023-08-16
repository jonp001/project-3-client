import React, { useContext, useEffect } from 'react'
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useLocation } from "../../contexts/Location.context";


const mapContainerStyle= {
    width: "500px",
    height: "500px"
};

export default function MapView() {
    const { locationData } = useLocation();

  useEffect(() => {
    const center= locationData;
    console.log(center);
  }, [locationData]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={locationData}
    zoom={20}
    >
      
      <MarkerF position={locationData} />
    </GoogleMap>
    </LoadScript>
  );
}
