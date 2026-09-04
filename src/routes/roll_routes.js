const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role_controller");

router.post("/createRoles", roleController.createRole);
router.get("/getRoles", roleController.getAllRoles);
router.get("/getRoles/:id", roleController.getRoleById);
router.put("/updateRoles/:id", roleController.updateRole);
router.delete("/deleteRoles/:id", roleController.deleteRole);

module.exports = router;