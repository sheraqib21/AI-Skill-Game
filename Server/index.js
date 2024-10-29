const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// Database connected
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// EXAMPLE
app.get('/', (req, res) => {
  res.send('Hello World');
});

// server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
