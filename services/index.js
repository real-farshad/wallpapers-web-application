const postsServices = require("./postsServices");
const categoriesServices = require("./categoriesServices");
const postsLikesServices = require("./postsLikesServices");
const postsCommentsServices = require("./postsCommentsServices");
const usersServices = require("./usersServices");

const database = {
    ...postsServices,
    ...categoriesServices,
    ...postsLikesServices,
    ...postsCommentsServices,
    ...usersServices,
};

module.exports = database;
