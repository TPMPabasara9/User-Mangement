const User = require('../models/user_model.js');
const roleService = require('./role_service.js');
const bcrypt = require('bcryptjs');


const createUser = async (userData) =>{

    //check if user already exists
    const existingUser = await User.findOne({email: userData.email});

    if(existingUser){
        throw new Error('User already exists');
    }

    const roleIds = [];

    for(const roleName of userData.roles){
        let role  = await roleService.getRoleByName(roleName);
        if(!role){
            role = await roleService.createRole({name: roleName});
        }
        roleIds.push(role._id);
    }

    //create the new user
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        roles: roleIds
    });
    const savedUser = await newUser.save();
    const responseUser = savedUser.toObject();
    delete responseUser.password;

    return responseUser;
    
}


const getAllUsers =  async (page =1 , limit =10) => {

    const skip = (page -1) * limit;

    const [users, totalUsers] =  await Promise.all([
        User.
        find().
        select('-password').
        skip(skip).
        limit(limit),

        User.countDocuments()

    ])

    return {
        users,
        pagination: {
            currentPage: page,
            pageSize: limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit)
        }
    };

};

const getUserById = async (id) => {
    if(!id){
        throw new Error('User ID is required');
    }
    console.log(`Fetching user with ID: ${id}`);
    const user = await User.findById(id).select('-password');
    if(!user){
        return null;
    }
    return user;
}

const updateUser = async (id, data) => {
    const updateData = { ...data };

    if(updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if(updateData.roles) {
        const roleIds = [];
        for(const roleName of updateData.roles) {
            let role = await roleService.getRoleByName(roleName);
            if(!role) {
                role = await roleService.createRole({ name: roleName });
            }
            roleIds.push(role._id);
        }
        updateData.roles = roleIds;
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).select('-password');

    return updatedUser;
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id).select('-password');
}

const getUsersByRole = async (roleName) => {
    if (!roleName) {
        throw new Error('Role name is required');
    }
    const role = await roleService.getRoleByName(roleName);
    if (!role) {
        return [];
    }

    const users = await User.find({ roles: role._id }).select('-password');
    return users;
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser, getUsersByRole };