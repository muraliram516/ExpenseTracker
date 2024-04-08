import React, { useState } from 'react';
import { updateProfile } from './firebaseService'; // Import your Firebase service functions

function CompleteProfile() {
  const [fullName, setFullName] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  const handleUpdateClick = async () => {
    try {
      // This is where you call your Firebase function to update the profile
      // You would need to create this updateProfile function in your Firebase service file
      await updateProfile({ fullName, profilePhotoUrl });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      <p>Your Profile is 64% completed. A complete Profile has higher chances of landing a job.</p>
      <div>
        <p>Contact Details</p>
        <label>
          Full Name:
          <input 
            type="text" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
          />
        </label>
        <label>
          Profile Photo URL:
          <input 
            type="text" 
            value={profilePhotoUrl} 
            onChange={(e) => setProfilePhotoUrl(e.target.value)} 
          />
        </label>
        <button onClick={handleUpdateClick}>Update</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}

export default CompleteProfile;
