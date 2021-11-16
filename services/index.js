const postsServices = require("./postsServices");
const categoriesServices = require("./categoriesServices");
const postsLikesServices = require("./postsLikesServices");

const database = {
    ...postsServices,
    ...categoriesServices,
    ...postsLikesServices,
};

module.exports = database;
