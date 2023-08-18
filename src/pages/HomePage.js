import React, { useContext} from 'react'
import UserContext from '../contexts/User.context'

export default function HomePage() {
  const { user }= useContext(UserContext);

  return (
    <div>
      { user ? <h4> Welcome, {user.name}! </h4> : <h4> HomePage </h4>}
      <div className='slogan'>
        Your "all in one" stop for finding group rides & races near you!
      </div>
    </div>
  )
}
