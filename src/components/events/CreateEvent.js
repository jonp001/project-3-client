import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../contexts/Location.context";


export default function CreateEvent() {
    const { setLocationData } = useLocation();
    const [formData, setFormData]= useState({
        title: "",
        img: "",
        level: "",
        description: "",
        eventType: "",

    });

  const navigate= useNavigate(); // this redirects users after creating an event to choose the location
  
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name] : e.target.value,
    })
  };

  const handleSubmit= async (e) => {
    e.preventDefault();
    // TODO: AXIOS CALL that create the event listing in db..

    // Redirection to select location
    navigate("/chooseLocation");
  };
  
    return (
    <form onSubmit={handleSubmit}>
       
        <label>
            Title: 
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
       
        <label>
            Level: 
            <input type='text' name="level" value={formData.level} onChange={handleChange} />
        </label>
        
        <label>
            Description:
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        
       <label>
        Event Type: 
       <label>
        <input 
          type="radio"
          name="eventType"
          value="race"
          checked={formData.eventType=== "race"}
          onChange={handleChange}
          /> Race
          </label>

          <label>
            <input 
              type="radio"
              name="eventType"
              value="group ride"
              checked={formData.eventType=== "group ride"}
              onChange={handleChange}
              /> Group Ride
          </label>
          </label>

        <button type="submit">Create Event Listing</button>






    </form>
  )
}
