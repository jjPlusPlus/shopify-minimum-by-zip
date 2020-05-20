const { gql } = require('apollo-server-koa');

const typeDefs = gql`
  # Queryable fields for a restriction
  type Restriction {
    zip: String
    minimum: String
    name: String
  }

  # Query all (or no) Restrictions
  type Query {
    restrictions: [Restriction]
  }
`;

module.exports = typeDefs
