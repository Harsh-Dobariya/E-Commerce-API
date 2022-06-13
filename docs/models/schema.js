module.exports = (role) => {
    return {
        [role]: {
            type: "object",
            description: `${role} object`,
            properties: {
                _id: {
                    type: "string",
                    description: `An id of a ${role}`,
                    example: "624d2822a2833eaddc2450be"
                },
                profileImage: {
                    type: "string",
                    description: `${role}'s profile image`,
                    example:
                        "https://res.cloudinary.com/harsh-dobariya-0001/image/upload/v1649223714/p7fczvorlaaazewubgqs.jpg"
                },
                name: {
                    type: "string",
                    description: `${role}'s name`,
                    example: "Harsh"
                },
                email: {
                    type: "string",
                    description: `${role}'s email`,
                    example: "hdobariya229@gmail.com"
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
        [`${role}_Input`]: {
            type: "object",
            description: `${role} input object`,
            required: ["name", "email", "password"],
            properties: {
                profileImage: {
                    type: "string",
                    description: `${role}'s profile image`,
                    format: "binary"
                },
                name: {
                    type: "string",
                    description: `${role}'s name`,
                    example: "Harsh"
                },
                email: {
                    type: "string",
                    description: `${role}'s email`,
                    example: "hdobariya229@gmail.com"
                },
                password: {
                    type: "string",
                    description: `${role}'s password`,
                    example: "Harsh@12345"
                }
            }
        }
    };
};
