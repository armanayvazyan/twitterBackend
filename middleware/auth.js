const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const Response = require("../schemas/baseResponse");

module.exports = (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.header('token'), 'secret', 'RANDOM_TOKEN_SECRET');
        User.findOne({username: decodedToken.username})
            .then(user => {
                if (!user) {
                    throw 'Invalid User';
                } else {
                    res.locals.user = user;
                    next();
                }
            });
    } catch {
        res.status(401).send(new Response('Error', 'Invalid token'))
    }
};
