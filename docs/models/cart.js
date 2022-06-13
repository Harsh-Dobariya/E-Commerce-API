module.exports = {
    Cart: {
        type: "object",
        description: "Cart object",
        properties: {
            _id: {
                type: "string",
                description: "An id of a Cart",
                example: "624d2822a2833eaddc2450be"
            },
            User: {
                $ref: "#/components/schemas/User"
            },
            Product: {
                $ref: "#/components/schemas/Product"
            },
            quantity: {
                type: "number",
                description: "Product's price",
                example: "15"
            },
            createdAt: {
                type: "string",
                description: "when object is created",
                example: "2022-04-06T05:41:54.372Z"
            },
            updatedAt: {
                type: "string",
                description: "when object is created",
                example: "2022-04-06T05:42:50.308Z"
            }
        }
    }
};
