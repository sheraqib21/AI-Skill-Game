const Category = require('../models/Category');


const addCategory = async (req, res) => {
    try {
        const { CategoryName, Description, DifficultyLevels } = req.body;

        
        const existingCategory = await Category.findOne({ CategoryName });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        
        const newCategory = new Category({
            CategoryName,
            Description,
            DifficultyLevels: DifficultyLevels || [1, 2, 3, 4, 5],
        });

        const savedCategory = await newCategory.save();
        res.status(201).json({ message: 'Category added successfully', data: savedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateCategory = async (req, res) => {
    try {
        const { CategoryName, Description, DifficultyLevels } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                CategoryName,
                Description,
                DifficultyLevels,
            },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', data: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
