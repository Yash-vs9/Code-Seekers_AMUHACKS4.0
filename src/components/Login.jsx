import React, { useState } from 'react';
import styles from './Login.module.css';
import { loginUser } from './api';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate()
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

  
    const credentials = { email, password }; // Make sure credentials are correctly set
  
    try {
      const result = await loginUser(credentials);
      if (result.success) {
        localStorage.setItem('authToken', result.token);  // or sessionStorage.setItem('token', result.token);;
        navigate('/'); // Redirect to home page or dashboard

        // Redirect to another page or store token here
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again.');
    } finally {

    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2 className={styles.heading}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputField}>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.options}>
            
            <a href="#" className={styles.link}>Forgot Password?</a>
          </div>
          <button type="submit" className={styles.button}>Sign In</button>
          <div className={styles.switch}>
            New to our site? <a href="/register" id="RegisterLink">Create account!</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;