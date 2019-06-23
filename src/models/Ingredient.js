const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    updated_at: Date,
    created_at: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Ingredient', IngredientSchema)
