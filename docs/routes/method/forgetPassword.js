module.exports = (role) => {
    return {
        post: {
            tags: [`${role} Routes`],
            summary: `forget password for ${role}`,
            description: "A forget password request",
            operationId: `forgetPassword${role}`,
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            description: `A ${role} email for send reset password link`,
                            required: ["email"],
                            properties: {
                                email: {
                                    type: "string",
                                    description: "A email for send reset password link",
                                    example: "hdobariya229@gmail.com"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "A response for success send link",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: {
                                        type: "string",
                                        description: "success message",
                                        example: "A reset password link send to your registerd email hdobariya229@gmail.com."
                                    }
                                }
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
