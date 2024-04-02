import React, { useState } from 'react';
import { auth } from '../../firebase'; 
import './LoginForm.css'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const token = await userCredential.user.getIdToken();
      console.log(token); // Store the token from Firebase as needed
    } catch (error) {
      setError(error.message);
      alert(error.message); // Alert the user to the error
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <button type="button">Forgot password</button>
        <p>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
export default LoginForm;
