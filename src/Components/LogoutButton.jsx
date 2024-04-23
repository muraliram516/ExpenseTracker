import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory(); // Hook to access the history instance

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      // Sign-out successful, clear the token and redirect to login page.
      localStorage.removeItem('idToken'); // Clear the idToken from local storage
      history.push('/login'); // Redirect to the login page
    }).catch((error) => {
      // An error happened during the sign-out process.
      console.error('Logout Error:', error);
      alert('An error occurred while logging out.');
    });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;