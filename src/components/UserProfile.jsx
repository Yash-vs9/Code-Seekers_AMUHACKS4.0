// src/components/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.css';
import { getUserDetails } from './api';

const UserProfile = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    bloodGroup: '',
    healthScore: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const info = await getUserDetails();
      console.log('User Details:', info);
      if (info.success) {
        setData((prev) => ({
          ...prev,
          ...info.data,
        }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.card}>
        <img
          src="https://api.dicebear.com/7.x/adventurer/svg?seed=Yash"
          alt="User Avatar"
          className={styles.avatar}
        />
        <h2 className={styles.name}>{data.name}</h2>
        <p className={styles.email}>{data.email}</p>
        <div className={styles.infoBox}>
          <p><strong>Age:</strong> {data.age?data.age:"empty"}</p>
          <p><strong>Height:</strong> {data.height?data.height+"cm":"empty"}</p>
          <p><strong>Weight:</strong> {data.weight?data.weight+"kg":"empty"}</p>
          <p><strong>Blood Group:</strong> {data.bloodGroup?data.bloodGroup:"empty"}</p>
          <p><strong>Health Score:</strong> {data.healthScore?data.healthScore:"Give Health Test"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;