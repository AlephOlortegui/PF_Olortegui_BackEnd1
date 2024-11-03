const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    available: Boolean
});

module.exports = mongoose.model('product', productSchema);