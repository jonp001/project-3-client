import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../contexts/User.context';
import EditProfile from '../components/profiles/EditProfile';
import { useParams } from 'react-router-dom';
const API_URL= process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function UserProfilePage() {
    const { userId } = useParams();
    const { user } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [viewedUser, setViewedUser] = useState({});


    useEffect(() => {
     
        axios.get(`${API_URL}/user/${userId}`)
          .then((response) => {
            setViewedUser(response.data);
            console.log('API Response:', response.data);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, [userId]);

    if(!viewedUser) return <div>No User Found...</div>;

    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = (updates) => {
        setViewedUser({...viewedUser, ...updates});
        setIsEditing(false);
    };


    return(
        <div className='user-profile-container'>
            <h1>{viewedUser.name}'s Profile</h1>
            <p> Bio: { viewedUser.bio || "No bio yet..." }</p>
            <img src= {viewedUser.img || "default-image.png"} alt= "profileImg"/>
            <p> Level: {viewedUser.level || "Level not set..." }</p>
            <h3> Strava Profile: {viewedUser.stravaProfile || "Strava Profile not set.."}</h3>
            {isEditing ? (
                <EditProfile user= {viewedUser} onSave={handleSaveClick} onCancel ={() => setIsEditing(false)} />
            ) : (
                user && user._id === viewedUser._id && <button onClick={handleEditClick}>Edit Profile </button>
            )}
           
        </div>
    );
}
