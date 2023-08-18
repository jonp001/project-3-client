import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import MapView from "../../components/locations/MapView";
import { useLocation } from "../../contexts/Location.context";
import UserContext from '../../contexts/User.context';
import { Link } from 'react-router-dom';
const API_URL= process.env.REACT_APP_API_URL || "http://localhost:5005";


export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const  { setLocationData } = useLocation()
 const { user: userData } = useContext(UserContext);
 const [isDeleted, setIsDeleted] = useState(false);


 const handleDeleteEvent = () => {
  //popup to confirm delete 
  if (!window.confirm("Are you sure you want to delete this event? (Location will also be DELETED)")) {
    return;
  }

  const token = localStorage.getItem("authToken");
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  };

  axios
    .delete(`${API_URL}/events/event/${event._id}`, config)
    .then(response => {
        setIsDeleted(true);
    })
    .catch(err => {
        console.error("Error deleting the event:", err);
    });
};


  useEffect(() => {
    axios.get(`${API_URL}/events/${eventId}`)
    .then(response => {
      console.log("Location Data from API:", response.data);
        setEvent(response.data.event);
      
      if(response.data.event.location && response.data.event.location.startLocation) {
        console.log(typeof response.data.event.location.startLocation.lat);
        console.log(typeof response.data.event.location.startLocation.lng);

        if(typeof response.data.event.location.startLocation.lat === 'number' && typeof response.data.event.location.startLocation.lng === 'number') {
          setLocationData({
              lat: response.data.event.location.startLocation.lat,
              lng: response.data.event.location.startLocation.lng});
      } else {
        console.error(" location data type is incorrect.")
      }
      } else {
        console.error("Location data is not found or incorrect.");
      }
        setLoading(false)
    })
    .catch(err => {
        setError(err.message);
        setLoading(false);
    })
  }, [eventId, setLocationData]);

  if(loading) {
    return <div> Event Details Loading...</div>;
  }
  
  if(error) {
    return <div> Error Loading Event Details: {error}</div>;
  }

  return (
    <div>
    {event ? (
      <div>
       <h2> Event Title: {event.title} </h2>
       <h3> Event Description: {event.description} </h3>
       <h3> Event Type: {event.eventType} </h3>
       <h4> Created By: {event.createdBy ? event.createdBy.name : "Unknown"} </h4>
       {event.location && event.location.startLocation && typeof event.location.startLocation.lat === 'number' && typeof event.location.startLocation.lng === 'number' && <MapView />}
       { (userData.isAdmin || event.createdBy._id === userData._id) && (
        <div>
    <Link to={`/events/edit-event/${event._id}`}>Edit Event</Link>
    <button onClick={handleDeleteEvent}>Delete Event</button>
    </div>
)}
       </div>
    ) : null}
    </div>
  )};