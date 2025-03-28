const User = require('../models/User');
const Job = require('../models/Job');
const Invoice = require('../models/Invoice');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Invoice.find({ user: req.user.id });
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};