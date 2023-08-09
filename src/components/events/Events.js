import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";


export default function Events() {
    const [eventList, setEventList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5005/events")
        .then(response => {
            console.log("Server Response:", response.data)
            setEventList(response.data.titles);
        })
        .catch(error => {
            console.log("An error has occured getting events:", error);
        });
    }, []);


  return (
    <div>
        {eventList.map((event, i) => (
        <Link key={event._id} to={`/events/${event._id}`}><li>{event.title}-{event.description}</li></Link>
        ))}
        
    </div>
  )
}
