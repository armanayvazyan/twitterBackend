const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const isUsernameUsed = await User.find({username: req.body.username}).count() > 0;
    if(isUsernameUsed) {
        return res.send("Username is already in use")
    }
    if (req.body.password.length > 6) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (!err) {
                    let token = jwt.sign({
                        username: req.body.username
                    }, 'secret', {expiresIn: '1h'});

                    const user = new User({
                        name: req.body.name,
                        age: req.body.age,
                        username: req.body.username,
                        password: hash,
                        token: token
                    });
                    user.save((err) => {
                        if (err)
                            return res.send(err);
                        else
                            return res.status(201).send({
                                status: "success",
                                message: "User Registered successfully",
                                user: {
                                    _id: user._id,
                                    name: req.body.name,
                                    age: req.body.age,
                                    username: req.body.username,
                                    token: token
                                }
                            });
                    });
                }
            });
        });
    }
    else {
        return res.send("Wrong password length");
    }
};

const signIn = async (req, res) => {
    let username = req.body.username;

    const user = await User.findOne({username: username});
    if(user == null) {
        return res.send("User not exist")
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!err) {
            let token = jwt.verify(user.token, 'secret', function (err, payload) {
                if (err) {
                    return jwt.sign({
                        username: req.body.username
                    }, 'secret', {expiresIn: '1h'})
                }
                return user.token;
            });

            User.findByIdAndUpdate(user._id, {token: token}, (err) => {
                if (err)
                    return res.send(err);
            })
            return res.status(200).send({
                status: "success",
                user: {
                    _id: user._id,
                    name: user.name,
                    age: user.age,
                    username: user.username,
                    token: token
                }
            });
        }
    });
}

const findAllUsers = async (req, res)=>{
    User.find({}, (err, data) => {
        if(err){
            return res.send(err);
        }
        return res.send(data);
    })
};

const findUserById = async (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if(err){
            return res.send(err);
        }
        return res.send(data);
    })
};

const updateUserById = async (req, res) => {
    const user = await jwt.verify(req.header('token'), 'secret', function (err, payload) {
        if (err) {
            return null;
        }
        if (!payload || !payload.username) {
            return null;
        }
        return User.findOne({username: payload.username});
    });
    if(!user){
        return res.status(401).send('Invalid Token')
    }
    if(String(req.params.id) !== String(user._id)){
        return res.status(401).send('Access Denied')
    }
    let update = {
        name: req.body.name,
        age: req.body.age
    };
    const doc = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (doc == null) {
        return res.send("User Not found")
    }
    return res.status(202).send({
        "status": "Updated",
        "response": user
    });
};

const deleteUserById = async (req, res) => {

    User.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err){
            return res.send(err);
        }
        if(doc == null) {
            return res.send("Not found");
        }
        return res.status(202).send({
            "status": "Success"
        });
    })
};

module.exports = {createUser, signIn, findUserById, findAllUsers, updateUserById, deleteUserById};