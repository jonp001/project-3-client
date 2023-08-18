import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../contexts/Location.context";
import axios from 'axios';
const API_URL= process.env.REACT_APP_API_URL || "http://localhost:5005";


export default function CreateEvent() {
    const { setLocationData } = useLocation();
    const [formData, setFormData]= useState({
        title: "",
        img: "",
        level: "",
        description: "",
        eventType: "",
        createdBy: "",

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
   
    const token= localStorage.getItem('authToken');
    console.log('Token from localStorage:', token);
    const config= {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    }
    try{ 
    const response= await axios.post(`${API_URL}/events/createEvent`, formData, config);
    console.log('Server response:', response.data);
    const createdEvent= response.data.event;

    console.log('Navigating to chooseLocation with eventId:', createdEvent._id);
    // Redirection to select location
    navigate(`/chooseLocation/${createdEvent._id}`);
  } catch (error) {
    console.error('Error creating event:', error.response?.data || error.message);
  }
}
  
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
