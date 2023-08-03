import React from 'react'
import { useParams } from 'react-router-dom'

export default function EventDetails() {
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

  const { eventId } = useParams();

  const event= eventList[eventId];

  return (
    <div>
       <h2> Event Title: {event.title} </h2>
       <h3> Event Description: {event.description} </h3>
       <h3> Event Type: {event.eventType} </h3>
    </div>
  )
}
