//authorization middleware
const authorize = (roles) => {
    return (req, res, next) => {
        const userRoles = req.user?.roles || [];
        const hasPermission = userRoles.some(userRole =>
            roles.some(role => role.toLowerCase() === userRole.toLowerCase())
        );

        if(!hasPermission){
            return res.status(403).json({
                message: 'Access denied. You do not have permission to perform this action'
            });
        }

        next();
    }

}

module.exports = { authorize };