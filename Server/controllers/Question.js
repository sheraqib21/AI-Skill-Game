const geminiApi = require('../services/GeminiApi');
const Question = require('../models/Question');  // Import the Question model

const getQuestions = async (req, res) => {
  // Get category and level from the request body
  const { category, level } = req.body;

  if (!category || !level) {
    return res.status(400).json({ message: 'Category and Level are required' });
  }

  try {
    // Generate a question using the Gemini API
    const generatedQuestion = await geminiApi.generateQuestion(category, level);

    // Create a new question document using the generated question data
    const newQuestion = new Question({
      category,                    // Category from request body
      level,                       // Level from request body
      type: 'mcq',                 // Assuming it's an MCQ for now (you can adjust this as needed)
      questionText: generatedQuestion.questionText,  // Question text
      options: generatedQuestion.options,  // Options array
      correctAnswer: generatedQuestion.correctAnswer,  // Correct answer
    });

    // Save the question document to the database
    await newQuestion.save();

    // Send the generated question as a response
    res.status(200).json(generatedQuestion);
  } catch (error) {
    console.error('Error generating or saving question:', error);
    res.status(500).json({ message: 'Failed to fetch or save question', error: error.message });
  }
};

module.exports = { getQuestions };
