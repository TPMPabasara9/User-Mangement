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

const getAllRoles = async (req, res) => {
    try{
        const roles =  await 
    }
}
