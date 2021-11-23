const usersServices = require("./usersServices");
const categoriesServices = require("./categoriesServices");
const postsServices = require("./postsServices");
const likesServices = require("./likesServices");
const commentsServices = require("./commentsServices");
const savesServices = require("./savesServices");
const collectionsServices = require("./collectionsServices");
const collectionsPostsServices = require("./collectionsPostsServices");

const database = {
    ...usersServices,
    ...categoriesServices,
    ...postsServices,
    ...likesServices,
    ...commentsServices,
    ...savesServices,
    ...collectionsServices,
    ...collectionsPostsServices,
};

module.exports = database;
