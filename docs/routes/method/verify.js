module.exports = (role) => {
    return {
        get: {
            tags: [`${role} Routes`],
            summary: `verify ${role} email`,
            description: `A ${role} email verify request`,
            operationId: `verify${role}`,
            parameters: [
                {
                    in: "path",
                    name: "token",
                    schema: {
                        $ref: "#/components/schemas/Token"
                    },
                    required: true,
                    description: "A token for authentication"
                }
            ],
            responses: {
                200: {
                    description: "A response for success verification",
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
                404: {
                    description: `A ${role} not found error`,
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
