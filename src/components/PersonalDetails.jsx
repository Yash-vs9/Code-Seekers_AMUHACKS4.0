import React, { useState } from 'react';
import styles from './PersonalDetails.module.css';
import { postUserDetails } from './api';
import { toast } from 'react-toastify';

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    age: '',
    weight: '',
    height: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = Number(formData.age);
    const weight = Number(formData.weight);
    const height = Number(formData.height);
    if (age <= 0 || weight <= 0 || height <= 0 || !formData.bloodGroup) {
      toast.error("Please enter valid details.");
      return;
    }
    console.log('Submitting User Details:', formData);

    const response = await postUserDetails(formData);
    console.log('Response:', response);
    
    if (response.success) {
      toast.success("Details updated successfully!");
    } else {
      toast.error("Failed to Update Details!")
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Personal Details</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="bloodGroup">Blood Group:</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter Age"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Enter Weight"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Enter Height"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default PersonalDetails;