const categories = require("./categories/_index");
const users = require("./users/_index");
const wallpapers = require("./wallpapers/_index");

module.exports = {
    ...categories,
    ...users,
    ...wallpapers,
};
