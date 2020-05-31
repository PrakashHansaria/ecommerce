const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 30,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    category:{
        type: ObjectId,
        ref: 'categories',
        required: true,
    },
    quantity:{
        type: Number,
        required: true
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping:{
        type: Boolean,
        required: false
    }
}, {timestamps: true}
);

module.exports = mongoose.model("product", productSchema)