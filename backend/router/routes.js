const express = require('express');
const router = express.Router();

const {register,login,updateDetails} = require('../controllers/controller');
const authenticate = require('../middleware/auth');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Update personal details (protected route)
router.put('/details', authenticate, updateDetails);

module.exports = router;