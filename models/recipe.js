import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    iconPath: String,
    splashPath: String,
    id: String,
    title: String,
    steps: Array,
    ingredients: Array,
})

module.exports = mongoose.models.Recipe || mongoose.model("Recipe", schema)