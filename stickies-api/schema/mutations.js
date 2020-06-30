const { UserType } = require('./types');
const { 
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');
const { registerUser } = require('../resolvers');

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
            resolve: async(_, {name, surname, email, password}) => {
                await registerUser(name, surname, email, password);

                return true;
            }
        }
    }
})