const { MongoDataSource } = require('apollo-datasource-mongodb');

class Restrictions extends MongoDataSource {
  getRestrictions(restrictionIds) {
    console.log("In the datasource.getRestrictions:")
    console.log(this.collection)
    return this.collection
  }
}
module.exports = Restrictions;
