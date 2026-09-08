const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const authenticationMiddleware = require('../middleware/authentication');
const authorizationMiddleware = require('../middleware/authorization');
const { validationMiddleware } = require('../middleware/validation');
const { createUserSchema, updateUserSchema } = require('../validation/userValidation');



router.post('/createUser', authenticationMiddleware.authenticate,
     authorizationMiddleware.authorize(['admin']),
     validationMiddleware(createUserSchema),
      userController.createUser);

router.get('/getUsers', authenticationMiddleware.authenticate,
     authorizationMiddleware.authorize(['admin']),
    userController.getAllUsers);

router.get('/getUser', authenticationMiddleware.authenticate,
     authorizationMiddleware.authorize(['admin']),
    userController.getUserById);

router.put('/updateUser/:id', authenticationMiddleware.authenticate,
      authorizationMiddleware.authorize(['admin']),
     validationMiddleware(updateUserSchema),
     userController.updateUser);

router.delete('/deleteUser/:id', authenticationMiddleware.authenticate,
      authorizationMiddleware.authorize(['admin']),
     userController.deleteUser);


module.exports = router;