const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const authenticationMiddleware = require('../middleware/authentication');
const authorizationMiddleware = require('../middleware/authorization');



router.post('/createUser', authenticationMiddleware.authenticate,
     authorizationMiddleware.authorize(['admin']),
      userController.createUser);

router.get('/getUsers', authenticationMiddleware.authenticate,
     authorizationMiddleware.authorize(['admin']),
    userController.getAllUsers);

router.get('/getUser', authenticationMiddleware.authenticate,
     authorizationMiddleware.authorize(['admin']),
    userController.getUserById);

router.put('/updateUser/:id', authenticationMiddleware.authenticate,
      authorizationMiddleware.authorize(['admin']),
     userController.updateUser);

router.delete('/deleteUser/:id', authenticationMiddleware.authenticate,
      authorizationMiddleware.authorize(['admin']),
     userController.deleteUser);


module.exports = router;