const resolvers = {
  Query: {
    restrictions(parent, args, context, info) {
      console.log(parent, args, context, info)
      console.log("query:restriction was called")
      const { dataSources } = context
      const restrictions = dataSources.getRestrictions()
      console.log(restrictions)
      return restrictions
    },
  }
}
