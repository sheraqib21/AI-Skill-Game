const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Account model
const Account = mongoose.model('Account', new mongoose.Schema({
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: String, required: true },
  balance: { type: Number, required: true },
}));

// Example route to add a document
app.post('/add-account', async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save(); // This will create the database and collection if they don't exist
    res.status(201).send('Account added!');
  } catch (error) {
    console.error('Error adding account:', error);
    res.status(500).send('Error adding account');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
