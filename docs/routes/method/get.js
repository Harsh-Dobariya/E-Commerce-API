module.exports = (role) => {
    return {
        get: {
            tags: [`${role} Routes`],
            summary: `get current ${role}`,
            description: `A ${role} get request`,
            operationId: `get${role}`,
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "A response for success fetch details",
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
