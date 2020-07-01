const mongoose = require('mongoose');
const { Schema, Types: { ObjectId } } = mongoose;

const user = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    stickies: [{ type: ObjectId, ref: 'Sticky' }],
})

module.exports = mongoose.model('User', user);