const Mcq = require('../models/Mcq');

// Create a new MCQ question
const createMcq = async (req, res) => {
    try {
        const { question, option1, option2, option3, option4, correctAnswer, playerAnswer } = req.body;

        const newMcq = new Mcq({
            question,
            option1,
            option2,
            option3,
            option4,
            correctAnswer,
            playerAnswer
        });

        const savedMcq = await newMcq.save();
        res.status(201).json({ message: 'MCQ created successfully', data: savedMcq });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create MCQ', error: error.message });
    }
};

// Get all MCQ questions
const getAllMcqs = async (req, res) => {
    try {
        const mcqs = await Mcq.find();
        res.status(200).json(mcqs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch MCQs', error: error.message });
    }
};

// Get an MCQ question by ID
const getMcqById = async (req, res) => {
    try {
        const { id } = req.params;
        const mcq = await Mcq.findById(id);

        if (!mcq) {
            return res.status(404).json({ message: 'MCQ not found' });
        }

        res.status(200).json(mcq);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch MCQ', error: error.message });
    }
};

// Update an existing MCQ question
const updateMcq = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedMcq = await Mcq.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedMcq) {
            return res.status(404).json({ message: 'MCQ not found' });
        }

        res.status(200).json({ message: 'MCQ updated successfully', data: updatedMcq });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update MCQ', error: error.message });
    }
};

// Delete an MCQ question
const deleteMcq = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMcq = await Mcq.findByIdAndDelete(id);

        if (!deletedMcq) {
            return res.status(404).json({ message: 'MCQ not found' });
        }

        res.status(200).json({ message: 'MCQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete MCQ', error: error.message });
    }
};

module.exports = {
    createMcq,
    getAllMcqs,
    getMcqById,
    updateMcq,
    deleteMcq,
};
