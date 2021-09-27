const Post = require("../models/postsModel");
const Response = require("../schemas/baseResponse");

const createPost = async (req, res) => {

    const user = res.locals.user;
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        userId: user._id
    })
    await post.save((err) => {
        if (err)
            return res.send(err);
        else
            return res.status(201).send(new Response(
                undefined,
                "Post created successfully",
                post
            ))
    })
};

const getUserPosts = async (req, res) => {
    const user = res.locals.user;

    const userPosts = await Post.find({userId: String(user._id)});

    return res.send({
        "status": "success",
        "posts": userPosts
    })
}

const getPostById = async (req, res) => {
    const user = res.locals.user;

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
    const user = res.locals.user;

    const post = await Post.findOneAndDelete({_id: req.params.id});
    if (post == null || String(post.userId) !== String(user._id)) {
        return res.send("Post Not found")
    }
    return res.send({
        "status": "success"
    })
};

const updatePostById = async (req, res) => {
    const user = res.locals.user;

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

