import React from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';

const VerifyEmailButton = () => {
  const handleVerifyEmail = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      sendEmailVerification(user)
        .then(() => {
          // Email verification sent!
          alert('Check your email for a verification link.');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          // Handle Errors here.
          if (errorCode === 'auth/invalid-user-token') {
            alert('The user's credential is no longer valid. The user must sign in again.');
          } else if (errorCode === 'auth/user-disabled') {
            alert('The user account has been disabled by an administrator.');
          } else if (errorCode === 'auth/user-not-found') {
            alert('No user found with this email address.');
          } else if (errorCode === 'auth/too-many-requests') {
            alert('We have blocked all requests from this device due to unusual activity. Try again later.');
          } else {
            alert(errorMessage);
          }
          console.error(error);
        });
    }
  };

  return (
    <button onClick={handleVerifyEmail}>Verify Email ID</button>
  );
};

export default VerifyEmailButton;
