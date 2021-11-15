const postsServices = require("./postsServices");
const categoriesServices = require("./categoriesServices");

const database = {
    ...postsServices,
    ...categoriesServices,
};

module.exports = database;
