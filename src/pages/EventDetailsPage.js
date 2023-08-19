import React from 'react';
import EventDetails from '../components/events/EventDetails'; // Adjust the import path if necessary

export default function EventDetailsPage() {
  return (
    <div className="event-details-page">
      <header>
        <h1>Event Details</h1>
        {/* You can also add any navigation or header elements here */}
      </header>
      <main>
        <EventDetails />
      </main>
      <footer>
        {/* Any footer content or elements */}
      </footer>
    </div>
  );
}