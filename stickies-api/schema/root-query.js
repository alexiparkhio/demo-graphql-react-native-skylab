const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLScalarType
} = require('graphql');
const { UserType, StickyType } = require('./types');
const { User } = require('stickies-data');
const { retrieveUser, retrieveUsers, retrieveStickies } = require('../resolvers');

module.exports = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users: {
            type: GraphQLList(UserType),
            resolve: async () => {
                return await retrieveUsers();
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (_, { id }, context) => {
                if (id) return await retrieveUser(id)
                else {
                    const { request: { tokenId: userId } } = context;
                    return await retrieveUser(userId)
                };
            }
        },
        stickies: {
            type: GraphQLList(StickyType),
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (_, { id }, __) => {
                return await retrieveStickies(id);
            }
        },
    }
})