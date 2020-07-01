const {
    GraphQLObjectType,
    GraphQLList
} = require('graphql');
const { UserType } = require('./types');
const { User } = require('stickies-data');
const { retrieveUser } = require('../resolvers');

module.exports = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users: {
            type: GraphQLList(UserType),
            resolve: async () => {
                const users = await User.find().lean();
                users.forEach(user => {
                    user.id = user._id.toString();
                    delete user._id, delete user.__v;
                })

                return users;
            }
        },
        user: {
            type: UserType,
            resolve: async (_, __, { request: { tokenId: userId } }) => {
                return await retrieveUser(userId);
            }
        }
    }
})