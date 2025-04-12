import React from 'react';
import styles from './Home.module.css';

const HomePage = () => {
  return (
    <div className={styles.page}>
      <nav className={styles.sidebar}>
        <ul>
          <li className={styles.header}>
            <span className={styles.logo}>HealthCare</span>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/>
              </svg>
            </button>
          </li>
          <li><a href="/home"><span>Home</span></a></li>
          <li><a href="/ai"><span>AI Chatbot</span></a></li>
          <li><a href="/docs"><span>Medical Certificates</span></a></li>
          <li><a href="/profile"><span>Profile</span></a></li>
          <li><a href="/signin"><span>Logout</span></a></li>
        </ul>
      </nav>

      <main className={styles.main}>
        <div className={styles.container}>
          <h2>Welcome to Healthcare</h2>
          <p>...</p>
        </div>
        <div className={styles.container}>
          <h2>Services Provided</h2>
          <p>...</p>
        </div>
        <div className={styles.container}>
          <h2>What's New?</h2>
          <p>...</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;