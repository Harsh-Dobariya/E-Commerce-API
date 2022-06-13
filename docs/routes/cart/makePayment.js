module.exports = {
    get: {
        tags: ["User Routes"],
        summary: "get payment of product",
        description: "A make payment request",
        operationId: "makePayment",
        security: [{ bearerAuth: [] }],
        responses: {
            200: {
                description: "A response for success make payment",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            description: "contains payment url",
                            example: {}
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
