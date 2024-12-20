const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API;
// Initialize the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate a question using the Gemini API
const generateQuestion = async (category, level) => {
  try {
    
    const prompt = `Create a multiple-choice question (MCQ) for the category "${category}" at level ${level} with 4 options and the correct answer. The options should be clearly labeled as A, B, C, and D. Include the correct answer at the end.`;

    // Generate content using Gemini model
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text().trim();

    if (generatedText) {
      
      const questionText = generatedText.split('\n')[0];
      const options = generatedText.split('\n').slice(1, 5); 
      const correctAnswer = generatedText.split('\n').slice(-1)[0]; 

      return {
        questionText,
        options,
        correctAnswer,
      };
    } else {
      throw new Error('No completion received from Gemini API');
    }

  } catch (error) {
    console.error("Error generating question:", error.message);
    throw new Error("Failed to generate question from Gemini API");
  }
};

module.exports = { generateQuestion };
