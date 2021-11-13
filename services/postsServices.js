const { database } = require("../configs/mongodb");

const postsCollection = () => database().collection("posts");

async function getPostsList({ search, category, sort, skip, limit }) {
    const find = {};
    if (search !== "") find.$text = { $search: search };
    if (category !== "") find.category = category;

    const cursor = await postsCollection().find(find).sort(sort).skip(skip).limit(limit);
    const result = await cursor.toArray();
    return result;
}

module.exports = {
    getPostsList,
};
