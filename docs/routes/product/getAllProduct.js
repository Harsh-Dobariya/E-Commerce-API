module.exports = (role) => {
    return {
        get: {
            tags: [`${role} Routes`],
            summary: "get all product",
            description: "All product get request",
            operationId: `getAllProduct${role}`,
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "A response for success fetch products",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                description: "A array of all products",
                                example: []
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
                    description: "Products not found error",
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
