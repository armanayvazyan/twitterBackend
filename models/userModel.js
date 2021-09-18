const mongoose = require("mongoose");
const userSchema = require('../schemas/userShema');

module.exports = mongoose.model('user', userSchema);
