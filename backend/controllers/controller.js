const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; // Store in .env in production

// Register function
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    await db.query(query, [name, email, hashedPassword]);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
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
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(query, [email]);
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1d' });
    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update personal details function (protected route)
const updateDetails = async (req, res) => {
  const { id } = req.user; // Comes from middleware (authenticate)
  const { dob, age, bloodGroup } = req.body;
  try {
    const query = 'UPDATE users SET dob = ?, age = ?, blood_group = ? WHERE id = ?';
    const [result] = await db.query(query, [dob, age, bloodGroup, id]);

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

// Exporting the functions
module.exports = {
  register,
  login,
  updateDetails,
};