import React, { useState } from 'react';
import styles from './Health.module.css'; 
import { sendScore } from './api';
import { toast } from 'react-toastify';

const Health = () => {
  const questions = [
    "How much do you sleep?",
    "How many glasses of water do you drink daily?",
    "How often do you exercise in a week?",
    "How would you rate your mental health?",
    "Do you consume fast food frequently?",
    "How often do you smoke or consume alcohol?",
    "Do you have any chronic illnesses?",
    "How often do you feel stressed?",
    "How often do you go for a medical checkup?",
    "Do you take any health supplements?"
  ];

  const options = [
    ["Less than 6 Hours", "6-8 Hours", "More than 8 Hours"],
    ["Less than 4", "4-6", "More than 6"],
    ["None", "1-2 times", "3-5 times", "Daily"],
    ["Poor", "Average", "Good", "Excellent"],
    ["Yes, often", "Sometimes", "Rarely", "Never"],
    ["Frequently", "Occasionally", "Rarely", "Never"],
    ["Yes", "No"],
    ["Always", "Often", "Sometimes", "Rarely", "Never"],
    ["Never", "Once in few years", "Yearly", "Every 6 months"],
    ["Yes", "No"]
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);

  const handleOptionChange = (qIndex, optIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = optIndex;
    setAnswers(updatedAnswers);
  };

  const handleClick = async() => {
    let total = 0;

    answers.forEach((ans, index) => {
      if (ans !== null) {
        if (
          (index === 0 && (ans === 1 || ans === 2)) ||
          (index === 1 && ans === 2) ||
          (index === 2 && ans >= 2) ||
          (index === 3 && ans >= 2) ||
          (index === 4 && ans >= 2) ||
          (index === 5 && ans >= 2) ||
          (index === 6 && ans === 1) ||
          (index === 7 && ans >= 2) ||
          (index === 8 && ans >= 2) ||
          (index === 9 && ans === 0)
        ) {
          total++;
        }
      }
    });

    setScore(total);
    await sendScore(total)
    toast.success("Score submitted successfully!");

  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.healthWrapper}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={goBack}>Go Back</button>
      </div>
      <div className={styles.container}>
        {questions.map((question, qIndex) => (
          <div className={styles.card} key={qIndex}>
            <p className={styles.question}>{question}</p>
            <div className={styles.options}>
              {options[qIndex].map((opt, i) => (
                <label key={i} className={styles.option}>
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={answers[qIndex] === i}
                    onChange={() => handleOptionChange(qIndex, i)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button className={styles.submitButton} onClick={handleClick}>Submit</button>

        {score !== null && (
          <div className={styles.score}>
            <h3>Your Health Score: {score} / 10</h3>
            <p>{score > 7 ? "Great! Keep it up 💪" : "Consider improving your habits ❤️"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Health;