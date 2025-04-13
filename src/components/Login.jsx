import React, { useState } from 'react';
import styles from './Login.module.css';
import { loginUser } from './api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate()
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    if (!isValidEmail(email)) {
      toast.error("Please Enter a Valid email!")
      return
    }
    if(password.length<8){
      toast.error("Password length must be greater than 8!")
      return
    }

  
    const credentials = { email, password }; // Make sure credentials are correctly set
  
    try {
      const result = await loginUser(credentials);
      if (result.success) {
        localStorage.setItem('authToken', result.token);  
        navigate('/'); 


      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      const status=err.status
      if(status===401){
        toast.error("Invalid Credentials!")
      }
      else if(status===500){
        toast.error("Server Error! Please try again later.")
      }
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