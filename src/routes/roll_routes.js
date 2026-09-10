const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role_controller");
const authenticationMiddleware = require("../middleware/authentication");
const authorizationMiddleware = require("../middleware/authorization");

/**
 * @swagger
 * /api/roles/createRoles:
 *   post:
 *     summary: Create a role
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: admin
 *               description:
 *                 type: string
 *                 example: Administrator role
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Validation error
 *     security:
 *       - bearerAuth: []
 */
router.post("/createRoles",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.createRole);

/**
 * @swagger
 * /api/roles/getRoles:
 *   get:
 *     summary: Get all roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Roles fetched successfully
 *       400:
 *         description: Request failed
 *     security:
 *       - bearerAuth: []
 */
router.get("/getRoles",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.getAllRoles);


/**
 * @swagger
 * /api/roles/getRoles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role fetched successfully
 *       400:
 *         description: Request failed
 *     security:
 *       - bearerAuth: []
 */
router.get("/getRoles/:id",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.getRoleById);

/**
 * @swagger
 * /api/roles/updateRoles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags:
 *       - Roles
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
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Request failed
 *     security:
 *       - bearerAuth: []
 */
router.put("/updateRoles/:id",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.updateRole);

/**
 * @swagger
 * /api/roles/deleteRoles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       400:
 *         description: Request failed
 *     security:
 *       - bearerAuth: []
 */
router.delete("/deleteRoles/:id",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.deleteRole);

module.exports = router;