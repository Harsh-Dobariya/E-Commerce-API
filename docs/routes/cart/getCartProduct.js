module.exports = {
    get: {
        tags: ["User Routes"],
        summary: "get cart product",
        description: "A cart get request",
        operationId: "getCartProduct",
        security: [{ bearerAuth: [] }],
        responses: {
            200: {
                description: "A response for success fetch cart",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            description: "A array of all products in cart",
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
                description: "product not found in cart error",
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
