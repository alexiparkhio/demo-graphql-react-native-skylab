const mongoose = require('mongoose');
const { Schema, Types: { ObjectId } } = mongoose;

const sticky = new Schema({
    author: { type: ObjectId, ref: 'User' },
    message: { type: String, required: true },
    created: { type: String }
});

module.exports = mongoose.model('Sticky', sticky);