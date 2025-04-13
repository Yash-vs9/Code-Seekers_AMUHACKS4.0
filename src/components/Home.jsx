import React from 'react';
import styles from './Home.module.css';

const HomePage = () => {
  return (
    <div className={styles.page}>
      <nav className={styles.sidebar}>
        <ul>
          <li className={styles.header}>
            <span className={styles.logo}>HealthCare</span>
           
          </li>
          <li><a href="/test"><span>Health Test</span></a></li>
          <li><a href="/bot"><span>AI Chatbot</span></a></li>
          <li><a href="/loc"><span>Find Nearby Hospitals</span></a></li>
          <li><a href="/profile"><span>Profile</span></a></li>
          <li><a href="/login"><span>Sign In</span></a></li>
        </ul>
      </nav>

      <main className={styles.main}>
        <div className={styles.container}>
          <h2>Welcome to Healthcare</h2>
          <p>Your personal digital health assistant. From quick symptom checks to managing health reports, 
          we're here to simplify your healthcare journey. Fast. Secure. Accessible.</p>
        </div>
        <div className={styles.container}>
        <h2>Services Provided</h2>
<ul>
  <li>💡 AI-Powered Symptom Checker – Get preliminary diagnosis in seconds.</li>

  <li>🧪 Health Assessment Tools – Monitor your vitals & health score.</li>
  <li>💬 24/7 AI Chatbot – Instant answers to your health-related queries.</li>
  <li>👤 Personal Health Profile – Manage records, prescriptions, and reports in one place.</li>
</ul>
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