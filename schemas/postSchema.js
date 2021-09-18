const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    title: Schema.Types.String,
    description: Schema.Types.String,
    userId: Schema.Types.ObjectId
});