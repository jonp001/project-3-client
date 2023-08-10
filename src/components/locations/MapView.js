import React, { useContext } from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useLocation } from "../../contexts/Location.context";


const mapContainerStyle= {
    width: "500px",
    height: "500px"
};

export default function MapView() {
    const { locationData } = useLocation();

    const center= locationData;
    console.log(center);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={center}
    zoom={10}
    >
      
      <Marker position={locationData} />
    </GoogleMap>
    </LoadScript>
  );
}
