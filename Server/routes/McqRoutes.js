const express = require('express');
const {
    createMcq,
    getAllMcqs,
    getMcqById,
    updateMcq,
    deleteMcq
} = require('../controllers/Mcq');

const McqRouter = express.Router();

// Create a new MCQ
McqRouter.post('/create', createMcq);

// Get all MCQs
McqRouter.get('/all', getAllMcqs);

// Get an MCQ by ID
McqRouter.get('/:id', getMcqById);

// Update an existing MCQ by ID
McqRouter.put('/:id', updateMcq);

// Delete an MCQ by ID
McqRouter.delete('/:id', deleteMcq);

module.exports = McqRouter;
