import React, { use, useEffect, useState } from 'react';
import styles from './Home.module.css';

const HomePage = () => {
  const[login,setLogin]=useState(false)
  
  useEffect(()=>{
    const token=localStorage.getItem('authToken')
    if(token){
      setLogin(true)
    }
  },[])
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
          <li><a href="/details"><span>Enter Personal Details</span></a></li>
          <li><a href="/profile"><span>Profile</span></a></li>
          <li>
  <a
    href="#"
    onClick={() => {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }}
  >
   {login?"Logout":"Login"}
  </a>
</li>
        </ul>
      </nav>

      <main className={styles.main}>
        <div className={styles.container}>
          <h2>Welcome to Health care</h2>
          <p>Your personal Health Check up website with AI features. Our main motive is to help everyone with the astonishing features provided by us. BE SAFE AND HEALTHY</p>
        </div>
        <div className={styles.container}>
        <h2>Services Provided</h2>
<ul>
  <li>💡 AI-Powered Symptom Checker – Get preliminary diagnosis in seconds.</li>

  <li>🧪 Health Assessment Tools – Monitor your vitals & health score.</li>
  <li>💬 24/7 AI Chatbot – Instant answers to your health-related queries.</li>
  <li>👤 Personal Health Profile – Manage records, prescriptions, and reports in one place.</li>
  <li>🏥 Find various Hospitals nearby your location. 100% accurate.</li>
</ul>
        </div>
        <div className={styles.container}>
          <h2>About us</h2>
          <p>Team Name : Code Seekers</p>
          <p>Members : Yash , Priyanshu , Lakshya</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;