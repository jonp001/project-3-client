import React from 'react'
import { Link } from "react-router-dom"
import Events from "../components/events/Events"

export default function EventsPage() {
  return (
    <div>
    <h1>Events List:</h1>
    <Events />
    <Link to = "/createEvent">
        <button>Create An Event</button>
    </Link>
    </div>
  )
}
