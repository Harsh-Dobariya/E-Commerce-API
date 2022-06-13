module.exports = {
    post: {
        tags: ["Seller Routes"],
        summary: "add product",
        description: "A product add request",
        operationId: "addProduct",
        security: [{ bearerAuth: [] }],
        requestBody: {
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/Product_Input"
                    }
                }
            }
        },
        responses: {
            201: {
                description: "A response for success add product",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Product"
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
