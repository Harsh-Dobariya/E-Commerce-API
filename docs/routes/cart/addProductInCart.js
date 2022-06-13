module.exports = {
    post: {
        tags: ["User Routes"],
        summary: "add product in cart",
        description: "A product add in cart request",
        operationId: "addProductInCart",
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
            201: {
                description: "A response for success add product in cart",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Cart"
                        }
                    }
                }
            },
            400: {
                description: "Invalid data provided",
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
