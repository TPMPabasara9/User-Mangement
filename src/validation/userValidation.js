const Joi = require('joi');

const roleName = Joi.string()
    .trim()
    .min(2)
    .max(30)
    .lowercase();

const createUserSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(2)
        .max(30)
        .required(),

    email: Joi.string()
        .trim()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .min(6)
        .max(72)
        .required(),

    roles: Joi.array()
        .items(roleName)
        .min(1)
        .required()
}).options({
    abortEarly: false,
    stripUnknown: true
});

const updateUserSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(2)
        .max(30),

    email: Joi.string()
        .trim()
        .email()
        .lowercase(),

    password: Joi.string()
        .min(6)
        .max(72),

    roles: Joi.array()
        .items(roleName)
        .min(1)
}).min(1).options({
    abortEarly: false,
    stripUnknown: true
});

module.exports = { createUserSchema, updateUserSchema };