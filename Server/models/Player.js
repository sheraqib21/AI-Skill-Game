const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    player_Id:{type: mongoose.Schema.Types.ObjectId, auto: true},
    playername: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mcqscore: { type: Number, default: 0 },
    sqscore: { type: Number, default: 0 },
    totalpoints: { type: Number, default: 0 },

}, { timestamps: true });

const Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;
