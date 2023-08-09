import React, { useContext } from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { LocationContext } from "../../contexts/Location.context";


const mapContainerStyle= {
    width: "500px",
    height: "500px"
};

export default function MapView() {
    const { locationData } = useContext(LocationContext);

    const center= locationData[0];

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={center}
    zoom={10}
    >
      {locationData.map((location, index) => (
        <Marker key={index} position={location} />
      ))}
    </GoogleMap>
    </LoadScript>
  );
}
