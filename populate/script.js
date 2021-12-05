require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const mockUsers = require("./mockUsers");
const mockCategories = require("./mockCategories");
const mockPosts = require("./mockPosts");

let client;
let database;

async function populate() {
    try {
        // connect to database
        await connectToDb();

        // delete previous data from database
        await clearCollections();

        // hash user passwords
        const users = await processUsers(mockUsers);

        // add users to database
        await addManyUsersToDatabase(users);
        console.log("inserting users: DONE");

        // add categories to database
        await addManyCategoriesToDatabase(mockCategories);
        console.log("inserting categories: DONE");

        // add categoryId and publisherId to posts and delete category and publisher
        const posts = await processPosts(mockPosts);

        // add posts to database
        await addManyPostsToDatabase(posts);
        console.log("inserting posts: DONE");

        // disconnect from database
        await disconnectFromDB();

        console.log("successfully populated database!");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

populate();

async function connectToDb() {
    const { MONGODB_URI } = process.env;
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const { MONGODB_DB } = process.env;
    database = client.db(MONGODB_DB);

    console.log("Connected to mongodb...");
}

async function disconnectFromDB() {
    await client.close();
    console.log("Disconnected from mongodb...");
}

async function clearCollections() {
    // get a list of all collection in the database
    const result = await database.command({
        listCollections: 1.0,
        authorizedCollections: true,
        nameOnly: true,
    });

    // loop through collections and remove all documents in it
    const collections = result.cursor.firstBatch;
    for (const collection of collections) {
        await database.collection(collection.name).deleteMany({});
    }
}

async function processUsers(users) {
    const usersList = [...users];

    for (let user of users) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    }

    return usersList;
}

async function addManyUsersToDatabase(users) {
    await database.collection("users").insertMany(users);
}

async function addManyCategoriesToDatabase(categories) {
    await database.collection("categories").insertMany(categories);
}

async function processPosts(posts) {
    const postsList = [...posts];

    for (let post of postsList) {
        post.categoryId = await findCategoryId(post.category);
        delete post.category;

        post.publisherId = await findUserId(post.publisher);
        delete post.publisher;
    }

    return postsList;
}

async function findCategoryId(title) {
    const category = await database.collection("categories").findOne({ title });
    return category._id;
}

async function findUserId(username) {
    const user = await database.collection("users").findOne({ username });
    return user._id;
}

async function addManyPostsToDatabase(posts) {
    await database.collection("posts").insertMany(posts);
}
