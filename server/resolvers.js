const resolvers = {
  Query: {
    Restriction(parent, args, context, info) {
      return [];
    },
    // restrictions: (parent, args, { dataSources: { posts } }) => posts.getPosts(user.postIds)
  }
}
