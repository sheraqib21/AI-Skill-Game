const mongoose = require('mongoose');

const APILogSchema = new mongoose.Schema({
    logID: { type: String, required: true, unique: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    request: { type: String },
    response: { type: String },
    
}, { timestamps: true });

const APILog = mongoose.model('APILog', APILogSchema);
module.exports = APILog;
