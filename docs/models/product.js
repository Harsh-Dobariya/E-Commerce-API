module.exports = {
    Product: {
        type: "object",
        description: "Product object",
        properties: {
            _id: {
                type: "string",
                description: "An id of a product",
                example: "624d2822a2833eaddc2450be"
            },
            profileImage: {
                type: "string",
                description: "Product's profile image",
                example: "https://res.cloudinary.com/harsh-dobariya-0001/image/upload/v1649223714/p7fczvorlaaazewubgqs.jpg"
            },
            product_name: {
                type: "string",
                description: "Product's name",
                example: "Airpods"
            },
            price: {
                type: "number",
                description: "Product's price",
                example: "15000"
            },
            description: {
                type: "string",
                description: "Product's description",
                example: "not at good for hearing"
            },
            quantity: {
                type: "number",
                description: "Product's quantity",
                example: "15"
            },
            Seller: {
                type: "string",
                description: "Product's Owner",
                example: "624d2822a2833eaddc2450be"
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
    },
    Product_Input: {
        type: "object",
        description: "Product object",
        properties: {
            profileImage: {
                type: "string",
                description: "Product's profile image",
                format: "binary"
            },
            product_name: {
                type: "string",
                description: "Product's name",
                example: "Airpods"
            },
            price: {
                type: "number",
                description: "Product's price",
                example: "15000"
            },
            description: {
                type: "string",
                description: "Product's description",
                example: "not at good for hearing"
            },
            quantity: {
                type: "number",
                description: "Product's price",
                example: "15"
            }
        }
    }
};
