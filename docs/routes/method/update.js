module.exports = (role) => {
    return {
        put: {
            tags: [`${role} Routes`],
            summary: `update current ${role}`,
            description: `A ${role} update request`,
            operationId: `update${role}`,
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            description: `${role} update object`,
                            properties: {
                                profileImage: {
                                    type: "string",
                                    description: `${role}'s profile image`,
                                    format: "binary"
                                },
                                name: {
                                    type: "string",
                                    description: `${role}'s name`,
                                    example: "Harsh"
                                },
                                email: {
                                    type: "string",
                                    description: `${role}'s email`,
                                    example: "hdobariya229@gmail.com"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "A response for success update",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: `#/components/schemas/${role}`
                            }
                        }
                    }
                },
                400: {
                    description: "A Invalid update error",
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
                500: {
                    description: "Internal server error"
                }
            }
        }
    };
};
