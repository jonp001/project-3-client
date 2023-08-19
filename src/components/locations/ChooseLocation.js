import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useLocation as useLocationContext } from "../../contexts/Location.context";
import { useParams } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

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
    <div className="chooseLocation-container">
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
          className="chooseLocation-input"
          type="number"
          name="lat"
          step="any"
          onChange={handleChange}
          placeholder="Latitude"
        />
        <input
          className="chooseLocation-input"
          type="number"
          name="lng"
          step="any"
          onChange={handleChange}
          placeholder="Longitude"
        />
        <input
          className="chooseLocation-input"
          type="text"
          name="address"
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          className="chooseLocation-input"
          type="text"
          name="city"
          onChange={handleChange}
          placeholder="City"
        />
        <input
          className="chooseLocation-input"
          type="text"
          name="state"
          onChange={handleChange}
          placeholder="State"
        />
        <button className="chooseLocation-button" type="submit">Choose Location</button>
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
