const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            description: 'API for managing users and roles.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '665f1a2b3c4d5e6f78901234' },
                        username: { type: 'string', example: 'john doe' },
                        email: { type: 'string', format: 'email', example: 'john@gmail.com' },
                        roles: {
                            type: 'array',
                            items: { type: 'string' },
                            example: ['admin'],
                        },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Role: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '665f1a2b3c4d5e6f78901234' },
                        name: { type: 'string', example: 'admin' },
                        description: { type: 'string', example: 'Administrator role' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Validation error' },
                    },
                },
            },
        },
    },

    apis: ['./src/routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;