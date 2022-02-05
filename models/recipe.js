import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    iconPath: String,
    splashPath: String,
    id: String,
    title: String,
    steps: Array,
    ingredients: Array,
    score: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.models.Recipe || mongoose.model("Recipe", schema)