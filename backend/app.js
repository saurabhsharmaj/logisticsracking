const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express(); // Create the app object

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

module.exports = app; // Export the app object