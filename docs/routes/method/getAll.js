module.exports = (role) => {
    return {
        get: {
            tags: ["Admin Routes"],
            summary: `get all ${role}`,
            description: `all ${role} get request`,
            operationId: `getAll${role}`,
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: `A response for success fetch ${role}`,
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                description: `A array of all ${role}`
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
                404: {
                    description: `${role}s not found error`,
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
