import React, { useEffect, useState } from 'react';
import styles from './NearbyHospitals.module.css';

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=10&apiKey=${API_KEY}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setHospitals(data.features);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    });
  }, [API_KEY]);

  if (loading) return <div className={styles.container}><p>Loading nearby hospitals...</p></div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Nearby Hospitals</h2>
      <ul className={styles.list}>
        {hospitals.map((hospital, index) => (
          <li key={index} className={styles.card}>
            <h3>{hospital.properties.name || 'Unnamed Hospital'}</h3>
            <p>{hospital.properties.address_line1}</p>
            <p>{hospital.properties.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyHospitals;