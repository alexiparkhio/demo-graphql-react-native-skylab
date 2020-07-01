const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList
} = require('graphql');
const { User, Sticky } = require('stickies-data');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },

        stickies: {
            type: GraphQLList(StickyType),
            async resolve(parent, _, __) {
                return await Sticky.find({ author: parent.id });
            }
        }
    })
});

const AuthType = new GraphQLObjectType({
    name: 'Authorization',
    fields: () => ({
        token: { type: GraphQLString },
        user: { type: UserType },
    }),
});

const StickyType = new GraphQLObjectType({
    name: 'Sticky',
    fields: () => ({
        id: { type: GraphQLID },
        message: { type: GraphQLNonNull(GraphQLString) },
        created: { type: GraphQLString },

        author: {
            type: UserType,
            async resolve(parent, _, __) {
                return await User.findById(parent.author);
            }
        }
    })
})

module.exports = {
    UserType, AuthType, StickyType
}