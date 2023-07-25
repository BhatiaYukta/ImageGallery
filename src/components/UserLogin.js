// src/components/Login.js
import React, { useState } from 'react';
import { auth, googleAuthProvider } from '../firebase';
import firebase from 'firebase/compat/app';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    auth().signInWithPopup(googleAuthProvider)
      .then((result) => {
        // Handle successful Google login
        console.log('Logged in with Google:', result.user);
      })
      .catch((error) => {
        // Handle errors
        console.error('Google login error:', error);
      });
  };

  const handleEmailPasswordLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Handle successful email/password login
        console.log('Logged in with email/password:', userCredential.user);
      })
      .catch((error) => {
        // Handle errors
        console.error('Email/password login error:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailPasswordLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
