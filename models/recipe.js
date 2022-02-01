import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    iconPath: String,
    id: String,
    title: String,
    content: String
})

module.exports = mongoose.models.Recipe || mongoose.model("Recipe", schema)