const { MongoDataSource } = require('apollo-datasource-mongodb');

class Restrictions extends MongoDataSource {
  getRestriction(restrictionId) {
    console.log(this.collection)
    return []
  }
  getRestrictions() {
    return []
  }
}
module.exports = Restrictions;
