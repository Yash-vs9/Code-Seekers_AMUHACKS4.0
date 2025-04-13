import React, { useState } from 'react';
import styles from './Register.module.css';
import { registerUser } from './api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Register = () => {
  const [name,setName]=useState('')
  const [email, setEmail] = useState('');
  const navigate=useNavigate()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    // Email validation
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email!");
      setLoading(false);
      return;
    }
  
    // Password validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      setLoading(false);
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
  
    try {
      const res = await registerUser({ name, email, password });
    
      setSuccess('Registration successful! Please log in.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/');
    } catch (error) {
      const status = error.status;
    
      if (status === 409) {
        toast.error("Email already exists!");
      } else if (status === 500) {
        toast.error("Server error! Please try again later.");
      } else {
        toast.error(error.message || "Registration failed!");
      }
    
      setError(error.message || 'Registration failed');
    }}

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <h2>Create Account</h2>
        <form>
          <div className={styles.inputField}>
            <input type="text" placeholder="Full Name" required value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className={styles.inputField}>
            <input type="email" placeholder="Email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className={styles.inputField}>
            <input type="password" placeholder="Password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          <div className={styles.inputField}>
            <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
          </div>
          <button type="submit" onClick={handleClick} className={styles.button}>Register</button>
          <div className={styles.switch}>
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;