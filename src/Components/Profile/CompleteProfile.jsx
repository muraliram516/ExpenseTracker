import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from './firebaseService'; // Import Firebase helper functions

function CompleteProfile({ userId }) {
  const [fullName, setFullName] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data when the component mounts
    const fetchProfileData = async () => {
      try {
        const profileData = await getProfile(userId);
        if (profileData) {
          setFullName(profileData.fullName || '');
          setProfilePhotoUrl(profileData.profilePhotoUrl || '');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleUpdateClick = async () => {
    try {
      await updateProfile(userId, { fullName, profilePhotoUrl });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Your Profile is 64% completed. A complete Profile has higher chances of landing a job.</p>
      <div>
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
