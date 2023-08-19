import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
 const navigate= useNavigate();


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
        navigate('/events'); 
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
       <h2 className='event-title'> Event Title: {event.title} </h2>
       <p className='event-description'> Event Description: {event.description} </p>
       <p className='event-type'> Event Type: {event.eventType} </p>
       <p className='event-level'>Event Level: {event.level}</p>
       <p className='created-by'> Created By: {event.createdBy ? event.createdBy.name : "Unknown"} </p>
       {event.location && event.location.startLocation && typeof event.location.startLocation.lat === 'number' && typeof event.location.startLocation.lng === 'number' && <MapView />}
       { userData && (userData.isAdmin || (event.createdBy && event.createdBy._id === userData._id)) && (
        <div className='event-actions'>
    <Link to={`/events/edit-event/${event._id}`}>Edit Event</Link>
    <button onClick={handleDeleteEvent}>Delete Event</button>
    </div>
)}
       </div>
    ) : null}
    </div>
  )};