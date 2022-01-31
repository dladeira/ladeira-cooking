import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: String,
    content: String
})

module.exports = mongoose.models.Recipe || mongoose.model("Recipe", schema)