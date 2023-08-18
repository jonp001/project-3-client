import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useLocation as useLocationContext } from "../../contexts/Location.context";
import { useParams } from "react-router-dom";
const API_URL= process.env.REACT_APP_URL || "http://localhost:5005";

export default function ChooseLocation() {
  const { eventId } = useParams();
  const { setLocationData } = useLocationContext();
  const [chosenLocation, setChosenLocation] = useState({
    lat: "",
    lng: "",
    address: "",
    city: "",
    state: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChooseLocation = async () => {
    const locationRequestData = {
      startLocation: {
        lat: chosenLocation.lat,
        lng: chosenLocation.lng,
        address: chosenLocation.address,
      },
      eventId,
      city: chosenLocation.city,
      state: chosenLocation.state,
    };
    

    try {
      const response = await axios.post(
        `${API_URL}/locations/location`,
        locationRequestData
      );
      if (response.status === 201) {
        console.log("Location Saved");
        setLocationData(chosenLocation);
        setSuccessMessage("Location Saved");
        setErrorMessage(null);
      }
    } catch (err) {
      console.error("An error occurred while saving location", err);
      setErrorMessage(
        "An error occurred while saving location. Please try again. "
      );
      setSuccessMessage(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChosenLocation((prevState) => ({
      ...prevState,
      [name]: name === "lat" || name === "lng" ? parseFloat(value) : value, // remember parseFloat can convert string => number
    }));
  };

  return (
    <div>
      {successMessage && <div className="successMessage">{successMessage}</div>}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChooseLocation();
        }}
      >
        {" "}
        {/*use the "step=any" to allow for floating point numbers" */}
        <input
          type="number"
          name="lat"
          step="any"
          onChange={handleChange}
          placeholder="Latitude"
        />
        <input
          type="number"
          name="lng"
          step="any"
          onChange={handleChange}
          placeholder="Longitude"
        />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="city"
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="state"
          onChange={handleChange}
          placeholder="State"
        />
        <button type="submit">Choose Location</button>
      </form>
    </div>
  );
}
