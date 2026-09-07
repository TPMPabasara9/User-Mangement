const authService = require('../service/auth_service');

const login = async(req,res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const userData = await authService.login(email, password);
        if(!userData){
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        res.status(200).json({
            message: 'Login successful',
            data: userData.user,
            token: userData.token
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = { login };