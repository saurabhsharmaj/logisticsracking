const express = require('express');
const router = express.Router();
const { register, login, getUserJobs, getUserPayments } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/jobs', getUserJobs);
router.get('/payments', getUserPayments);

module.exports = router;