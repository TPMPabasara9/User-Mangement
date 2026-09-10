const User = require('../models/user_model.js');
const roleService = require('./role_service.js');
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");


const login = async (email, password) => {
    const user = await User.findOne({ email }).populate('roles', 'name');
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const token = JWT.sign({
        id: user._id,
        email: user.email,
        roles: user.roles.map(role => role.name)
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const responseUser = user.toObject();
    delete responseUser.password;

    return { user: responseUser, token };
    
}

module.exports = { login };
