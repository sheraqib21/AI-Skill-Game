const ShortQuestion = require('../models/ShortQuestion');

// Create a new Short Question
const createShortQuestion = async (req, res) => {
    try {
        const { question, answer, score } = req.body;

        const newShortQuestion = new ShortQuestion({
            question,
            answer,
            score
        });

        const savedShortQuestion = await newShortQuestion.save();
        res.status(201).json({ message: 'Short question created successfully', data: savedShortQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create short question', error: error.message });
    }
};

// Get all Short Questions
const getAllShortQuestions = async (req, res) => {
    try {
        const shortQuestions = await ShortQuestion.find();
        res.status(200).json(shortQuestions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch short questions', error: error.message });
    }
};

// Get a Short Question by ID
const getShortQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        const shortQuestion = await ShortQuestion.findById(id);
        if (!shortQuestion) {
            return res.status(404).json({ message: 'Short question not found' });
        }

        res.status(200).json(shortQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch short question', error: error.message });
    }
};

// Update an existing Short Question
const updateShortQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedShortQuestion = await ShortQuestion.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedShortQuestion) {
            return res.status(404).json({ message: 'Short question not found' });
        }

        res.status(200).json({ message: 'Short question updated successfully', data: updatedShortQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update short question', error: error.message });
    }
};

// Delete a Short Question
const deleteShortQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedShortQuestion = await ShortQuestion.findByIdAndDelete(id);

        if (!deletedShortQuestion) {
            return res.status(404).json({ message: 'Short question not found' });
        }

        res.status(200).json({ message: 'Short question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete short question', error: error.message });
    }
};

module.exports = {
    createShortQuestion,
    getAllShortQuestions,
    getShortQuestionById,
    updateShortQuestion,
    deleteShortQuestion
};
