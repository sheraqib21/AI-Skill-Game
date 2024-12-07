const geminiApi = require('../services/GeminiApi');
const Question = require('../models/Question');  // Import the Question model

const getQuestions = async (req, res) => {
  
  const { category, level } = req.body;

  if (!category || !level) {
    return res.status(400).json({ message: 'Category and Level are required' });
  }

  try {
    
    const generatedQuestion = await geminiApi.generateQuestion(category, level);

    
    const newQuestion = new Question({
      category,                    
      level,                       
      type: 'short question',                 
      questionText: generatedQuestion.questionText,  
      options: generatedQuestion.options,  
      correctAnswer: generatedQuestion.correctAnswer,  // Correct answer
    });

    
    await newQuestion.save();

    
    res.status(200).json(generatedQuestion);
  } catch (error) {
    console.error('Error generating or saving question:', error);
    res.status(500).json({ message: 'Failed to fetch or save question', error: error.message });
  }
};

module.exports = { getQuestions };
