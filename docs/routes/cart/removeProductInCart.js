module.exports = {
    delete: {
        tags: ["User Routes"],
        summary: "remove product in cart",
        description: "A product remove in cart request",
        operationId: "removeProductInCart",
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                in: "path",
                name: "productId",
                schema: {
                    $ref: "#/components/schemas/_id"
                },
                required: true,
                description: "A id for find product"
            }
        ],
        responses: {
            200: {
                description: "A response for success remove product in cart",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Cart"
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
            500: {
                description: "Internal server error"
            }
        }
    }
};
