import React from 'react'

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
  return (
    <div>
        {eventList.map((event, i) => (
        <p key={i}>{event.title}-{event.description}</p>
        ))}
    </div>
  )
}
