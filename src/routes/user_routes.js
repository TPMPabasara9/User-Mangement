const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const authenticationMiddleware = require('../middleware/authentication');
const authorizationMiddleware = require('../middleware/authorization');
const { validationMiddleware } = require('../middleware/validation');
const { createUserSchema, updateUserSchema } = require('../validation/userValidation');
/**
 * @swagger
 * /api/users/createUser:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - roles
 *             properties:
 *               username:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "admin"
 *
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *     security:
 *       - bearerAuth: []
 */

router.post('/createUser', authenticationMiddleware.authenticate,
     authorizationMiddleware.authorize(['admin']),
     validationMiddleware(createUserSchema),
      userController.createUser);

/**
 * @swagger
 * /api/users/getUsers:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of users
 *       400:
 *         description: Request failed
 *     security:
 *       - bearerAuth: []
 */
router.get('/getUsers', authenticationMiddleware.authenticate,
     authorizationMiddleware.authorize(['admin']),
    userController.getAllUsers);


/**
 * @swagger
 * /api/users/getUser/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Request failed
 *     security:
 *       - bearerAuth: []
 */
router.get('/getUser/:id', authenticationMiddleware.authenticate,
     authorizationMiddleware.authorize(['admin']),
    userController.getUserById);

/**
 * @swagger
 * /api/users/updateUser/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */
router.put('/updateUser/:id', authenticationMiddleware.authenticate,
      authorizationMiddleware.authorize(['admin']),
     validationMiddleware(updateUserSchema),
     userController.updateUser);

/**
 * @swagger
 * /api/users/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Request failed
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */
router.delete('/deleteUser/:id', authenticationMiddleware.authenticate,
      authorizationMiddleware.authorize(['admin']),
     userController.deleteUser);

/**
 * @swagger
 * /api/users/getUsersByRole/{roleName}:
 *   get:
 *     summary: Get users by role
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: roleName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       400:
 *         description: Request failed
 *     security:
 *       - bearerAuth: []
 */
router.get('/getUsersByRole/:roleName', authenticationMiddleware.authenticate,
      authorizationMiddleware.authorize(['admin']),
     userController.getUsersByRole);

module.exports = router;