const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; 


const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const result = await db.query(query, [name, email, hashedPassword]);

    const userId = result[0].insertId; 


    const token = jwt.sign({ id: userId, email }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token, // ✅ include the token
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
      });
    }
    console.error("Unexpected Error:", err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(query, [email]);

    // If no user found with the provided email
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY, 
      { expiresIn: '1d' }
    );

    // Send token back in response
    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


const updateDetails = async (req, res) => {
  const email = req.user.email; 
  const { bloodGroup, age, weight, height } = req.body;

  try {

    console.log("Updating details for user with email:", email);
    console.log("Data received:", { bloodGroup, age, weight, height });


    const query = 'UPDATE users SET blood_group = ?, age = ?, weight = ?, height = ? WHERE email = ?';
    const [result] = await db.query(query, [bloodGroup, age, weight, height, email]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'Details updated successfully',
    });
  } catch (err) {
    console.error("Update Details Error:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to update details',
    });
  }
};
const getDetails = async (req, res) => {
  const email = req.user.email; // Get user email from the token (make sure it's part of your JWT payload)
  try {
    // In your controller
const query = 'SELECT name, email, age, height, weight, blood_group AS bloodGroup, health_score AS healthScore FROM users WHERE email = ?';
    const [result] = await db.query(query, [email]);
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    // Log to check the received details
    console.log("Getting details for user with email:", email);
    console.log("Data received:", result);
    res.json({
      success: true,
      data: result[0], 
    });
  }
  catch (err) {
    console.error("Get Details Error:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to get details',
    });
  }}

// controller.js
const updateHealthScore = async (req, res) => {

  const { score } = req.body;
  const userEmail = req.user.email;  
  
  if (score === undefined) {
    return res.status(400).json({ success: false, message: 'Score is required' });
  }

  try {
    const query = 'UPDATE users SET health_Score = ? WHERE email = ?';
    const result = await db.query(query, [score, userEmail]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({

      success: true,
      message: 'Health score updated successfully',
    });
  } catch (err) {
    console.error('Update Health Score Error:', err);
    res.status(500).json({ success: false, message: 'Error updating score' });
  }
};
   

module.exports = {
  register,
  login,
  updateDetails,
  getDetails,
  updateHealthScore,
};