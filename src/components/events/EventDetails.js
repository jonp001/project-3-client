import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";

export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5005/events/${eventId}`)
    .then(response => {
        setEvent(response.data.event);
        setLoading(false);
    })
    .catch(err => {
        setError(err.message);
        setLoading(false);
    })
  }, [eventId]);

  if(loading) {
    return <div> Event Details Loading...</div>;
  }
  
  if(error) {
    return <div> Error Loading Event Details: {error}</div>;
  }

  return (
    <div>
       <h2> Event Title: {event.title} </h2>
       <h3> Event Description: {event.description} </h3>
       <h3> Event Type: {event.eventType} </h3>
    </div>
  )
}
