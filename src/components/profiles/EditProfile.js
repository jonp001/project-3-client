import React, { useState } from 'react';

export default function EditProfile( { user, onSave, onCancel} ) {
  const [bio, setBio] = useState(user.bio || '');
  const [image, setImage] = useState(user.image || '');
  const [level, setLevel] = useState(user.level || '');

  const handleSave = () => {
    onSave({ bio, image, level });
  };
  

    return (
   <div>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
      <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Level" />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
