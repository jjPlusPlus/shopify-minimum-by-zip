const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull,
       GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const Restriction = require('../models/restriction');

// var restrictions = [
//     { zip:"92651", name: "Laguna Beach", minimum: "125", id:1},
//     { zip:"90620", name: "Buena Park", minimum: "100", id: 2},
//     { zip:"92679", name: "Coto de Caza", minimum: "125",  id: 3 }
// ]

const RestrictionType = new GraphQLObjectType({
    name: 'Restriction',
    fields: () => ({
        id: { type: GraphQLID  },
        zip: { type: GraphQLString },
        minimum: { type: GraphQLString },
        name: { type: GraphQLString }
    })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book
//or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        restriction: {
            type: RestrictionType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Restriction.findById(args.id);
            }
        },
        restrictions: {
            type: new GraphQLList(RestrictionType),
            resolve(parent, args) {
                return Restriction.find({});
            }
        }
    }
});

//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRestriction: {
            type: RestrictionType,
            args: {
                //GraphQLNonNull make these field required
                name: { type: new GraphQLNonNull(GraphQLString) },
                zip: { type: new GraphQLNonNull(GraphQLString) },
                minimum: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let newRestriction = new Restriction({
                    name: args.name,
                    zip: args.zip,
                    minimum: args.minimum
                });
                return newRestriction.save();
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
