const categories = require("./categories/_index");
const users = require("./users/_index");
const wallpapers = require("./wallpapers/_index");
const likes = require("./likes/_index");
const saves = require("./saves/_index");
const comments = require("./comments/_index");
const collections = require("./collections/_index");
const collectionsRecords = require("./collectionsRecords/_index");

module.exports = {
    ...categories,
    ...users,
    ...wallpapers,
    ...likes,
    ...saves,
    ...comments,
    ...collections,
    ...collectionsRecords,
};
