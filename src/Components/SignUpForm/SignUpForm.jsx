import React, { useState } from 'react';
import {auth} from '../../firebase.jsx'

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      console.log('User has successfully signed up.');
    } catch (error) {
      setError(error.message);
    }
  };

  const isFormInvalid = !email || !password || !confirmPassword;

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isFormInvalid}>Sign up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
