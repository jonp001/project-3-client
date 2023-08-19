import React, { useContext} from 'react'
import UserContext from '../contexts/User.context'
import { Link } from "react-router-dom";

export default function HomePage() {
  const { user }= useContext(UserContext);

  return (
    <div className='home-page'>
      { user ? <h4> Welcome, {user.name}! </h4> : <h4> HomePage </h4>}

      <div className='slogan'>
        <h1>"Your "all in one" stop for finding group rides & races near you!"</h1>
      </div>
      <Link to="/events"> 
        <button className="events-button">Find an Event!</button>
      </Link>
      
      {user && (
        <Link to="/createEvent">
          <button className="create-event-button">Create a New Event!</button>
        </Link>
      )}

    </div>
  )
}
