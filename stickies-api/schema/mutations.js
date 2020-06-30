const { env: { SECRET } } = process;
const { UserType, AuthType } = require('./types');
const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');
const { registerUser, authenticateUser } = require('../resolvers');
const jwt = require('jsonwebtoken');

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: {
            type: GraphQLBoolean,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                surname: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, { name, surname, email, password }) => {
                await registerUser(name, surname, email, password);

                return true;
            }
        },

        authenticateUser: {
            type: AuthType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, { email, password }) => {
                const id = await authenticateUser(email, password);
                const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' });

                return { token };
            }
        }
    }
})