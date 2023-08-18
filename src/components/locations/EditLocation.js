import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API_URL= process.env.REACT_APP_API_URL || "http://localhost:5005";


export default function EditLocation() {
  const { locationId } = useParams();
  const [locationData, setLocationData] = useState(null);
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/locations/location/${locationId}`) // Assuming you have this endpoint to fetch individual location by id
      .then((response) => {
        setLocationData(response.data.location);
      })
      .catch((err) => {
        console.error("Error fetching location data:", err);
      });
  }, [locationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the changing field is part of startLocation
    if (name === "lat" || name === "lng" || name === "address") {
        setLocationData(prevState => ({
            ...prevState,
            startLocation: {
                ...prevState.startLocation,
                [name]: name === "lat" || name === "lng" ? parseFloat(value) : value
            }
        }));
    } else {
        setLocationData({
            ...locationData,
            [name]: value
        });
    }
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(
        `${API_URL}/locations/edit-location/${locationId}`,
        locationData,
        config
      );

      navigate(`/events`); 
    } catch (error) {
      console.error(
        "Error updating the location:",
        error.response?.data || error.message
      );
    }
  };

  if (!locationData) return <div>Loading...</div>

  return (
    <div>
        {successMessage && <div className="successMessage">{successMessage}</div>}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        <form onSubmit={handleLocationSubmit}>
            <input
                type="number"
                name="lat"
                step="any"
                value={locationData.startLocation?.lat || ''}
                onChange={handleChange}
                placeholder="Latitude"
            />
            <input
                type="number"
                name="lng"
                step="any"
                value={locationData.startLocation?.lng || ''}
                onChange={handleChange}
                placeholder="Longitude"
            />
            <input
                type="text"
                name="address"
                value={locationData.startLocation?.address || ''}
                onChange={handleChange}
                placeholder="Address"
            />
            <input
                type="text"
                name="city"
                value={locationData.city || ''}
                onChange={handleChange}
                placeholder="City"
            />
            <input
                type="text"
                name="state"
                value={locationData.state || ''}
                onChange={handleChange}
                placeholder="State"
            />
            <button type="submit">Update Location</button>
        </form>
    </div>
  );
}