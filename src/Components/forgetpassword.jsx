import React, { useState } from 'react';
import { auth } from './firebase'; // Import your Firebase configuration

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.sendPasswordResetEmail(email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setMessage('Failed to send password reset email. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Reset Password'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgetPassword;
