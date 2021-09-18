const express = require('express');
const router  = express.Router();
const postsController = require('../controllers/postsController');

router.post('', postsController.createPost);
router.get('', postsController.getUserPosts);
router.get('/:id', postsController.getPostById);
router.put('/:id', postsController.updatePostById);
router.delete('/:id', postsController.deletePostById);

module.exports = router;