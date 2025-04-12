import React from 'react';
import styles from './Register.module.css';

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <h2>Create Account</h2>
        <form>
          <div className={styles.inputField}>
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className={styles.inputField}>
            <input type="email" placeholder="Email" required />
          </div>
          <div className={styles.inputField}>
            <input type="password" placeholder="Password" required />
          </div>
          <div className={styles.inputField}>
            <input type="password" placeholder="Confirm Password" required />
          </div>
          <button type="submit" className={styles.button}>Register</button>
          <div className={styles.switch}>
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;