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

<div className="instructions">
        (
        <b>
          <em>
            ONLY LATITUDE, LONGITUDE, STATE & CITY ARE <u>REQUIRED</u>
          </em>
        </b>
        ) How To Get Coordinates(Latitude & Longitude)?
        <div className="instructions-content">
          <b>Google Maps:</b>
          <ul>
            <li>
              1a. (Mobile App): Touch & <b>HOLD</b> the desired location in
              Google Maps until a red "dropped pin" appears.
            </li>

            <li>
              1b. (Web App): Press & <b>HOLD</b> left click button at the desired
              location until a small grey "dropped pin".
            </li>

            <li>
              2a. (Mobile App): Scroll down until you see a map pin/ map marker
              icon on the left (typically found under a photo of the area).
            </li>

            <li>
              2b. (Web App): You should see a little popup at the center of the
              bottom of your screen.
            </li>
            <li>
              3a. (Mobile App): Please use <b>ALL DIGITS</b> found in the
              paranthesis to input the coordinates(
              <em>
                <b>
                  The first set of numbers= Latitude & second set= Longitude
                </b>{" "}
              </em>
              )
            </li>
            <li>
              3b. (Web App): Please use <b>ALL DIGITS</b> found in the little
              popup to input the coordinates(
              <em>
                <b>
                  The first set of numbers= Latitude & second set= Longitude
                </b>{" "}
              </em>
              )
            </li>
          </ul>
          <br />
          <b>Bing Maps:</b> 
            <ul>
              <li>
                1. (Web App): Simply right click on desired location
              </li>
              <li>
                2. (Web App): Obtain the Latitude and Longitude at the very bottom of the drop down menu that appeared (Please use <b>ALL DIGITS</b>) (     <em>
                <b>
                  The first set of numbers= Latitude & second set= Longitude
                </b>{" "}
              </em>
              )
              </li>
            </ul>
            <b>Apple Maps: (As of IOS 16 map update does not show Latitude & Longitutude)</b> 
             
        </div>
      </div>
    </div>
  );
}