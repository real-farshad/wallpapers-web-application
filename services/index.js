const usersServices = require("./usersServices");
const postsServices = require("./postsServices");
const categoriesServices = require("./categoriesServices");
const postsLikesServices = require("./postsLikesServices");
const postsCommentsServices = require("./postsCommentsServices");
const postsSavesServices = require("./postsSavesServices");

const database = {
    ...usersServices,
    ...postsServices,
    ...categoriesServices,
    ...postsLikesServices,
    ...postsCommentsServices,
    ...postsSavesServices,
};

module.exports = database;
