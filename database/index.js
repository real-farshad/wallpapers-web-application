const users = require("./users");
const categories = require("./categories");
const posts = require("./posts");
const likes = require("./likes");
const comments = require("./comments");
const saves = require("./saves");
const collections = require("./collections");
const collectionsPosts = require("./collectionsPosts");

const database = {
    ...users,
    ...categories,
    ...posts,
    ...likes,
    ...comments,
    ...saves,
    ...collections,
    ...collectionsPosts,
};

module.exports = database;
