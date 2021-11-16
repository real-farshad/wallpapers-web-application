const postsServices = require("./postsServices");
const categoriesServices = require("./categoriesServices");
const postsLikesServices = require("./postsLikesServices");
const usersServices = require("./usersServices");

const database = {
    ...postsServices,
    ...categoriesServices,
    ...postsLikesServices,
    ...usersServices,
};

module.exports = database;
