const bcrypt = require('bycryptjs');

const User = require('../models/user_model.js');
const Role = require('../models/role_model.js');


const createUser = async (userData) => {
    const { username, email, password, roles } = userData;

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword,
        roles
    });

    return await user.save();
};




