const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role_controller");
const authenticationMiddleware = require("../middleware/authentication");
const authorizationMiddleware = require("../middleware/authorization");

router.post("/createRoles",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.createRole);

router.get("/getRoles",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.getAllRoles);


router.get("/getRoles/:id",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.getRoleById);

router.put("/updateRoles/:id",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.updateRole);

router.delete("/deleteRoles/:id",
    authenticationMiddleware.authenticate,
    authorizationMiddleware.authorize(['admin']),
    roleController.deleteRole);

module.exports = router;