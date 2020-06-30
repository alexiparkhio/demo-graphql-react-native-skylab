const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    })
});

//TODO Other potential types

module.exports = {
    UserType
}