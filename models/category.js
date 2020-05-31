const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: 40,
    },
}, {timestamps: true}
);

module.exports = mongoose.model("category", categorySchema)