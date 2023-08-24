import React, { useState } from 'react';

export default function EditProfile( { user, onSave, onCancel} ) {
  const [bio, setBio] = useState(user.bio || '');
  const [image, setImage] = useState(user.image || '');
  const [level, setLevel] = useState(user.level || '');
  const [stravaProfile, setStravaProfile] = useState(user.stravaProfile || '');

  const handleSave = () => {
    onSave({ bio, image, level, stravaProfile });
  };
  

    return (
   <div className='edit-profile-container'>
      <textarea className="edit-profile-input" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
      <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Level" />
      <input type="text" value={stravaProfile} onChange={(e) => setStravaProfile(e.target.value)} placeholder="Strava Profile" />
      <button className="edit-profile-button save-button" onClick={handleSave}>Save</button>
      <button className="edit-profile-button save-button" onClick={onCancel}>Cancel</button>
    </div>
  );
}
