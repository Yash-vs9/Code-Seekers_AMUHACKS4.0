const express = require('express');
const router = express.Router();

const {register,login,updateDetails,getDetails,updateHealthScore} = require('../controllers/controller');
const authenticate = require('../middleware/auth');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);
router.patch('/details', authenticate, updateDetails);
router.get('/profile',authenticate,getDetails)
router.patch('/update-score',authenticate, updateHealthScore);

module.exports = router;