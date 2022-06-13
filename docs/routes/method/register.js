module.exports = (role) => {
    return {
        post: {
            tags: [`${role} Routes`],
            summary: `register ${role}`,
            description: `A ${role} registration request`,
            operationId: `register${role}`,
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: `#/components/schemas/${role}_Input`
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "A response for success registration",
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
                    description: "A error object for failure registration",
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
