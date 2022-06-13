module.exports = (role) => {
    return {
        delete: {
            tags: [`${role} Routes`],
            summary: `remove current ${role}`,
            description: `A ${role} remove request`,
            operationId: `remove${role}`,
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "A response for success deletion",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: `#/components/schemas/${role}`
                            }
                        }
                    }
                },
                401: {
                    description: "Access token is missing or invalid",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error"
                            }
                        }
                    }
                },
                500: {
                    description: "Internal server error"
                }
            }
        }
    };
};
