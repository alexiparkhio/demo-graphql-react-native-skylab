const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    })
});

const AuthType = new GraphQLObjectType({
    name: 'Authorization',
    fields: () => ({
        token: { type: GraphQLString },
        user: { type: UserType },
    }),
});

//TODO Other potential types

module.exports = {
    UserType, AuthType
}