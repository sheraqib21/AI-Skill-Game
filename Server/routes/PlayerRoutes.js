const express = require('express');
const {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
} = require('../controllers/Player');

const PlayerRouter = express.Router();

// Routes for Player
PlayerRouter.post('/add', createPlayer);          // Register a new player
PlayerRouter.get('/all', getAllPlayers);          // Fetch all players
PlayerRouter.get('/:id', getPlayerById);          // Fetch a player by ID
PlayerRouter.put('/:id', updatePlayer);           // Update a player's profile
PlayerRouter.delete('/:id', deletePlayer);        // Delete a player

module.exports = PlayerRouter;
