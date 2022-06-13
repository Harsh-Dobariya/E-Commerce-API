module.exports = {
    put: {
        tags: ["User Routes"],
        summary: "update product in cart",
        description: "A product update in cart request",
        operationId: "updateProductInCart",
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
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        description: "Cart object",
                        properties: {
                            quantity: {
                                type: "number",
                                description: "Product's quantity",
                                example: "15"
                            }
                        }
                    }
                }
            }
        },
        responses: {
            200: {
                description: "A response for success update product in cart",
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
