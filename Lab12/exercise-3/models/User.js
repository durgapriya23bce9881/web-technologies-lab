const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;