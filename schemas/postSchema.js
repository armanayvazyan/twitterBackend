const mongoose = require('mongoose');
const {Types} = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    title: Schema.Types.String,
    description: Schema.Types.String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user`'
    },
    comments: [{type: Schema.Types.ObjectId}]
});