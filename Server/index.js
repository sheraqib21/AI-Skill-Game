const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const questionRoutes = require('./routes/QuestionRoutes');  // Correct import path
const CategoryRouter = require('./routes/CategoryRoutes');
const PlayerRouter = require('./routes/PlayerRoutes');
const GameSessionRouter = require('./routes/GameSessionRoutes');
const ScoreRouter = require('./routes/ScoreRoutes');
const McqRouter = require('./routes/McqRoutes');
const ShortQuesRouter = require('./routes/ShortQuesRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use questionRoutes under the '/api' path
app.use('/api', questionRoutes);  // Ensure this is correct
app.use('/api/categories',CategoryRouter);
app.use('/api/player',PlayerRouter);
app.use('/api/gamesession',GameSessionRouter);
app.use('/api/score',ScoreRouter);
app.use('/api/mcq',McqRouter);
app.use('/api/shortques',ShortQuesRouter);
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
