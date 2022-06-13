module.exports = (role) => {
    return {
        post: {
            tags: [`${role} Routes`],
            summary: `reset password for ${role}`,
            description: `A reset password request`,
            operationId: `resetPassword${role}`,
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
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            description: `A ${role} email for send reset password link`,
                            required:["password"],
                            properties: {
                                password: {
                                    type: "string",
                                    description:"A new password for reset old password",
                                    example: "Harsh3210"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "A response for success reset password",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        description: "success message",
                                        example: "Your password has been updated."
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "password Validation error",
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
