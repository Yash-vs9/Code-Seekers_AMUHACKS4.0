import React, { useEffect, useState } from 'react';
import styles from './NearbyHospitals.module.css';

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
  

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=10&apiKey=${API_KEY}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (!data.features) throw new Error("No data returned");
          setHospitals(data.features);
        } catch (error) {
          console.error("Error fetching hospitals:", error);
          setErrorMsg("Failed to fetch nearby hospitals.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg("Permission denied. Please allow location access.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg("Location unavailable. Try again later.");
            break;
          case error.TIMEOUT:
            setErrorMsg("Location request timed out.");
            break;
          default:
            setErrorMsg("An unknown error occurred.");
        }
        setLoading(false);
      }
    );
  }, [API_KEY]);

  if (loading) return <div className={styles.container}><p>Loading nearby hospitals...</p></div>;
  if (errorMsg) return <div className={styles.container}><p>{errorMsg}</p></div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Nearby Hospitals</h2>
      <ul className={styles.list}>
        {hospitals.map((hospital, index) => (
          <li key={index} className={styles.card}>
            <h3>{hospital.properties.name || 'Unnamed Hospital'}</h3>
            <p>{hospital.properties.address_line2 || 'No address available'}</p>
            <p>{hospital.properties.city || 'City not specified'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyHospitals;