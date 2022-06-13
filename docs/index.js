const basicInfo = require("./basicInfo"),
    servers = require("./servers"),
    components = require("./components"),
    tags = require("./tags"),
    paths = require("./paths");

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...paths
};
