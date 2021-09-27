const Post = require("../models/postsModel");
const Comment = require("../models/commentsModel");

const createComment = async (req, res) => {
    const user = res.locals.user;
    const comment = new Comment({
        text: req.body.text,
        postId: req.params.id,
        userId: user._id
    })

    await comment.save((err, doc) => {
        if (err)
            return res.send(err);
        else
        {
            Post.findByIdAndUpdate( req.params.id, {$push:{comments: doc._id}}, (err, doc) =>{
                return res.status(201).send({
                    status: "success",
                    message: "Comment added successfully",
                    comment: comment
                });
            })
        }

    })
};

module.exports = {createComment};

