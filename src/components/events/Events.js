import React from 'react'
import { Link } from "react-router-dom";


export default function Events() {
    const eventList = [
        {
            title: "First bike race of season",
            description: "covering all categories(cat 1-5)",
            eventType: "race"
        },
        {
            title: "Weekly group ride (A) ",
            description: "Avg speed 23+ mph",
            eventType: "group ride"
        },
        {
            title: "second bike race of season",
            description: "covering all categories (cat 1-5)",
            eventType: "race"
        },
    ]
  return (
    <div>
    
        {eventList.map((event, i) => (
        <Link key={i} to={`/events/${i}`}><li>{event.title}-{event.description}</li></Link>
        ))}
        
    </div>
  )
}
