const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    username: Schema.Types.String,
    password: Schema.Types.String,
    token: Schema.Types.String,
    name: Schema.Types.String,
    age: Schema.Types.Number,
});