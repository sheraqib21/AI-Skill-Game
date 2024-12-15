const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    Category_ID: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true, 
    },
    CategoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
    },
    Description: {
        type: String,
        required: false,
        trim: true,
    },
    DifficultyLevels: {
        type: [Number], // Array of difficulty levels (e.g., [1, 2, 3, 4, 5])
        default: [1, 2, 3, 4, 5], // Default levels
    },

}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
