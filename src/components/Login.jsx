import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
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