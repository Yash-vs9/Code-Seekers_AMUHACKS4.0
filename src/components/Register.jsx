import React, { useState } from 'react';
import styles from './Register.module.css';
import { registerUser } from './api';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [name,setName]=useState('')
  const [email, setEmail] = useState('');
  const navigate=useNavigate()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    await registerUser({ name, email, password })
      .then((res) => {
        if (res.success) {
          setSuccess('Registration successful! Please log in.');
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigate('/')
        } else {
          setError(res.message || 'Registration failed');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('An error occurred. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
    
  };

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