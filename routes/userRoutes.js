const express = require('express');
const router  = express.Router();
const userController = require('../controllers/usersController');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.signIn);
router.get('', userController.findAllUsers);
router.get('/:id', userController.findUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;