const roleService = require('../service/role_service.js');

const createRole = async (req, res) => {
    try{
        const role = await roleService.createRole(req.body);
        res.status(201).json({
            message: 'Role created successfully',
            data: role
        });

        

    }catch (error) {
        res.status(400).json({
            message: error.message
        });

    }
}


const getAllRoles = async (req,res) => {
    try{
        const roles = await roleService.getAllRoles();
        res.status(200).json({
            message: 'Roles fetched successfully',
            data: roles
        });

    }
    catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const getRoleById = async (req,res) => {
    try{
        const roleId = req.params.id;
        const role = await roleService.getRoleById(roleId);
        res.status(200).json({
            message: 'Role fetched successfully',
            data: role
        });
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const updateRole = async (req,res) => {
    try{
        const roleId = req.params.id;
        const roleData = req.body;
        const updatedRole = await roleService.updateRole(roleId, roleData);
        res.status(200).json({
            message: 'Role updated successfully',
            data: updatedRole
        });

    }
    catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}

const deleteRole = async (req,res) => {
    try{
        const roleId = req.params.id;
        const deletedRole = await roleService.deleteRole(roleId);
        res.status(200).json({
            message: 'Role deleted successfully',
            data: deletedRole
        });
    }
    catch(error){
        res.status(400).json({
            message: error.message
        });
    }
}


module.exports = { createRole, getAllRoles, getRoleById, updateRole, deleteRole };
