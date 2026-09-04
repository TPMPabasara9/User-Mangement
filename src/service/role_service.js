const User = require('../models/user_model.js');
const Role = require('../models/role_model.js');


const createRole = async (roleData) => {
   const existingRole  = await Role.findOne({ name: roleData.name });
   if(existingRole){
    throw new Error('Role already exists');
   }

   return await Role.create(roleData);
}

const getAllRoles = async () => {
    return await Role.find();
}

const getRoleById  = async (id) => {
const role =  await Role.findById(id);
if(!role){
    throw new Error('Role not found');
}

return role;
}
const getRoleByName = async (name) => {

    const role = await Role.findOne({ name: name });
    if(!role){
        console.log(`Role with name ${name} not found`);
        return null;
    }
    return role;
}

const updateRole = async (id, data) =>{
    const role = await Role.findByIdAndUpdate(id, data,
         { new: true 
            // runValidators: true
         }
        );
    if(!role){
        throw new Error('Role not found');
    }
    return role;
}

const deleteRole = async (id) =>{
    const role = await Role.findByIdAndDelete(id);
    if(!role){
        throw new Error('Role not found');
    }
    return role;
}

module.exports = {createRole, getAllRoles,getRoleById, updateRole, deleteRole,getRoleByName};



