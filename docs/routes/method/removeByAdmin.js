module.exports = (role, id) => {
    return {
        delete: {
            tags: ["Admin Routes"],
            summary: `remove ${role} by admin`,
            description: `A ${role} remove request`,
            operationId: `remove${role}ByAdmin`,
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: "path",
                    name: id,
                    schema: {
                        $ref: "#/components/schemas/_id"
                    },
                    required: true,
                    description: `A id for find ${role}`
                }
            ],
            responses: {
                200: {
                    description: `A response for success remove ${role}`,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: `#/components/schemas/${role}`
                            }
                        }
                    }
                },
                400: {
                    description: "Invalid id provided",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error"
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
                    description: `${role} not found error`,
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
