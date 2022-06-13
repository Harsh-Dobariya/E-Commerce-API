module.exports = {
    delete: {
        tags: ["Seller Routes"],
        summary: "remove product by seller",
        description: "A product remove request",
        operationId: "removeProduct",
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
                description: "A response for success remove product",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Product"
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
            404: {
                description: "product not found error",
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
