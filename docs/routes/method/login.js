module.exports = (role) => {
    return {
        post: {
            tags: [`${role} Routes`],
            summary: `login ${role}`,
            description: `A ${role} login request`,
            operationId: `login${role}`,
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Login"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "A response for success login",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    [role.toLowerCase()]: {
                                        $ref: `#/components/schemas/${role}`
                                    },
                                    [`x-${role}-token`]: {
                                        type: "string",
                                        description: `A ${role} authentication token`,
                                        example:
                                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDg3MDM0MTd9.A_ESu9URa9UuR47b60Q_HmMXDrMLG4h2kqviJlNCswY"
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "A error object for failure login",
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
