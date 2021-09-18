const Post = require("../models/postsModel");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const createPost = async (req, res) => {
    const user = await jwt.verify(req.header('token'), 'secret', function (err, payload) {
        if (err) {
            res.status(401).send('Invalid Token')
        }
        if (!payload || !payload.username) {
            res.status(401).send('Invalid Token')
        }
        return User.findOne({username: payload.username});
    });
    if (!user) return;
    console.log(user)

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        userId: user._id
    })
    post.save((err) => {
        if (err)
            return res.send(err);
        else
            return res.status(201).send({
                status: "success",
                message: "Post created successfully",
                post: post
            });
    })
};

const getUserPosts = async (req, res) => {
    const user = await jwt.verify(req.header('token'), 'secret', function (err, payload) {
        if (err) {
            res.status(401).send('Invalid Token')
        }
        if (!payload || !payload.username) {
            res.status(401).send('Invalid Token')
        }
        return User.findOne({username: payload.username});
    });
    if (!user) return;
    const userPosts = await Post.find({userId: String(user._id)});

    return res.send({
        "status": "success",
        "posts": userPosts
    })
}

const getPostById = async (req, res) => {
    const user = await jwt.verify(req.header('token'), 'secret', function (err, payload) {
        if (err) {
            res.status(401).send('Invalid Token')
        }
        if (!payload || !payload.username) {
            res.status(401).send('Invalid Token')
        }
        return User.findOne({username: payload.username});
    });
    if (!user) return;
    const post = await Post.findById(req.params.id);

    if (String(post.userId) !== String(user._id)) {
        return res.send("Post Not found")
    }
    return res.send({
        "status": "success",
        "posts": post
    })

};

const deletePostById = async (req, res) => {
    const user = await jwt.verify(req.header('token'), 'secret', function (err, payload) {
        if (err) {
            res.status(401).send('Invalid Token')
        }
        if (!payload || !payload.username) {
            res.status(401).send('Invalid Token')
        }
        return User.findOne({username: payload.username});
    });
    if (!user) return;

    const post = await Post.findOneAndDelete({_id: req.params.id});
    if (post == null || String(post.userId) !== String(user._id)) {
        return res.send("Post Not found")
    }
    return res.send({
        "status": "success"
    })
};

const updatePostById = async (req, res) => {
    const user = await jwt.verify(req.header('token'), 'secret', function (err, payload) {
        if (err) {
            res.status(401).send('Invalid Token')
        }
        if (!payload || !payload.username) {
            res.status(401).send('Invalid Token')
        }
        return User.findOne({username: payload.username});
    });
    if (!user) return;
    const updatedPost = {
        title : req.body.title,
        description : req.body.description
    }
    const post = await Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true });

    if (post == null || String(post.userId) !== String(user._id)) {
        return res.send("Post Not found")
    }
    return res.send({
        "status": "success",
        "post": post
    })
};

module.exports = {createPost, getUserPosts, getPostById, updatePostById, deletePostById};

