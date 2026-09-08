const validationMiddleware = (schema) => {
        return (req, res, next) => {
            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    message: error.details.map(detail => detail.message).join(', ')
                });
            }
            req.body = value;
            next();
        };
    }

module.exports = { validationMiddleware };