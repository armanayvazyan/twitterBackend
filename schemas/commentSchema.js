const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    text: {
        type: Schema.Types.String
    },
    postId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId
});