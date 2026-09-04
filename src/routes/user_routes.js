const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/createUser', userController.createUser);
router.get('/getUsers', userController.getAllUsers);
router.get("/getUsers/:id", userController.getUserById);

module.exports = router;