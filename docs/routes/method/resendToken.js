module.exports = (role) => {
    return {
        post: {
            tags: [`${role} Routes`],
            summary: `resendToken for ${role}`,
            description: "For email verification resend token request",
            operationId: `resendToken${role}`,
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            description: "resend token input object",
                            required: ["email"],
                            properties: {
                                email: {
                                    type: "string",
                                    description: "A email for send verification link",
                                    example: "hdobariya229@gmail.com"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "A response for success resend token",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        description: "success message",
                                        example: "A verification email has been sent to hdobariya229@gmail.com."
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: `A already verified ${role} request error`,
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
