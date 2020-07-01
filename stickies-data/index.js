const mongoose = require('mongoose');

module.exports = {
    mongoose,
    User: require('./models/user'),
    Sticky: require('./models/sticky'),
}