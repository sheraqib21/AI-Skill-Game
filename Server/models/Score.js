const mongoose = require('mongoose');
require('./ShortQuestion'); // Import the ShortQuestion model to register it
require('./Mcq');
require('./Player');
require('./Category');
const TotalPointsSchema = new mongoose.Schema({
    TotalPoints_ID: { 
        type: mongoose.Schema.Types.ObjectId, 
        auto: true 
    },
    Player_ID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', 
        required: true 
    },
    SQPoints_ID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ShortQuestion', 
        required: true 
    },
    MCQPoints_ID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Mcq', 
        required: true 
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false, 
    },
}, { timestamps: true });

const Score = mongoose.model('Score', TotalPointsSchema);
module.exports = Score;
