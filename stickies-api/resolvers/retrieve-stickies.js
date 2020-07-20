const { validate } = require('../utils');
const { NotFoundError } = require('../errors');
const { User, Sticky } = require('stickies-data');

module.exports = userId => {
    if (userId) {
        validate.string(userId, 'userId');
        return (async () => {
            const user = await User.findById(userId);
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`);

            const stickies = await Sticky.find({ author: userId }).lean();

            stickies.forEach(sticky => {
                sticky.id = sticky._id.toString();
                delete sticky._id, delete sticky.__v;
            });

            return stickies;
        })();
    } else {
        return (async () => {
            const stickies = await Sticky.find().lean();

            stickies.forEach(sticky => {
                sticky.id = sticky._id.toString();
                delete sticky._id, delete sticky.__v;
            });

            return stickies.sort(function(a, b) { 
                return Number(new Date(b.created)) - Number(new Date(a.created))
            });
        })();
    }
}