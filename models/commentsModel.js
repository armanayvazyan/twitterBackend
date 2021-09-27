const mongoose = require('mongoose');
const commentSchema = require('../schemas/commentSchema');

module.exports = mongoose.model('comment', commentSchema);
