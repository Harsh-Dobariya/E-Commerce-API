const User = require("./models/schema")("User"),
    Seller = require("./models/schema")("Seller"),
    Product = require("./models/product"),
    Cart = require("./models/cart"),
    Admin = require("./models/schema")("Admin");

module.exports = {
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "Bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: {
            _id: {
                type: "string",
                description: "An id of a object",
                example: "624d2822a2833eaddc2450be"
            },
            Token: {
                type: "string",
                description: "An token for authentication",
                example:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDg3MDM0MTd9.A_ESu9URa9UuR47b60Q_HmMXDrMLG4h2kqviJlNCswY"
            },
            ...User,
            ...Seller,
            ...Product,
            ...Cart,
            ...Admin,
            Login: {
                type: "object",
                description: "login input object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                        description: "A email for login",
                        example: "hdobariya229@gmail.com"
                    },
                    password: {
                        type: "string",
                        description: "A password for login",
                        example: "Harsh@12345"
                    }
                }
            },
            Error: {
                type: "object",
                description: "error object",
                properties: {
                    error: {
                        type: "object"
                    },
                    status_code: {
                        type: "number"
                    }
                }
            }
        }
    }
};
