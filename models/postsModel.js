const mongoose = require('mongoose');
const postSchema = require('../schemas/postSchema');

module.exports = mongoose.model('post', postSchema);
