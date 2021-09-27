const express = require('express');
const router  = express.Router();
const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');

const comments = require('./commenttRoutes')


const auth = require('../middleware/auth');

router.post('', auth, postsController.createPost);
router.get('', auth, postsController.getUserPosts);
router.get('/:id', auth, postsController.getPostById);
router.put('/:id', auth, postsController.updatePostById);
router.delete('/:id', auth, postsController.deletePostById);
router.post('/:id/comments', auth, commentsController.createComment);

module.exports = router;