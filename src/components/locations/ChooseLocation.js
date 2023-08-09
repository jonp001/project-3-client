import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useLocation as useLocationContext } from "../../contexts/Location.context"


export default function ChooseLocation() {
    const locationState=useLocation().state;
    const eventId= locationState?.eventId;
    const { setLocationData } = useLocationContext();
    const [chosenLocation, setChosenLocation] = useState({
        latitude: "",
        longitude: "",
        address: "",
        city: "",
        state: ""
    })

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChooseLocation= async ()  => {
        const locationRequestData = {
            startLocation: {
                latitude: chosenLocation.latitude,
                longitude: chosenLocation.longitude,
                address: chosenLocation.address,
            },
            eventId,
            city: chosenLocation.city,
            state: chosenLocation.state,
        };

        try{
            const response= await axios.post("http://localhost:5005/locations/location", locationRequestData);
            if( response.status === 201) {
                console.log("Location Saved");
                setLocationData(chosenLocation);
                setSuccessMessage("Location Saved");
                setErrorMessage(null);
            }
        } catch(err) {
            console.error("An error occurred while saving location", err);
            setErrorMessage("An error occurred while saving location. Please try again. ")
            setSuccessMessage(null);
        }
    };

    const handleChange = (e) => {
        const { name, value} = e.target; 
        setChosenLocation(prevState => ({
            ...prevState,
            [name]: value
        }));
     };
    
  return (
    <div>
    {successMessage && <div className="successMessage">{successMessage}</div>}
    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    <form onSubmit={(e) => {
        e.preventDefault();
        handleChooseLocation();
    }}>
        <input type="text" name="latitude" onChange={handleChange} placeholder='Latitude' />
        <input type='text' name='longitude' onChange={handleChange} placeholder='Longitude' />
        <input type='text' name='address' onChange={handleChange} placeholder='Address' />
        <input type='text' name='city' onChange={handleChange} placeholder='City' />
        <input type='text' name='state' onChange={handleChange} placeholder='State' />
        <button type='submit'>Choose Location</button>
    </form>
    </div>
  );
}
