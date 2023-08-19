import React from 'react';
import CreateEvent from '../components/events/CreateEvent'

export default function CreateEventPage() {
    return (
        <div className="create-event-page">
            <h1>Create a New Event</h1>
            <CreateEvent />
        </div>
    );
}