const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restrictionSchema = new Schema({
    zip: String,
    name: String,
    minimum: String
});

module.exports = mongoose.model('Restriction', restrictionSchema);
