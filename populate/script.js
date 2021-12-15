require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const mockUsers = require("./mockUsers");
const mockCategories = require("./mockCategories");
const mockPosts = require("./mockPosts");
const mockComments = require("./mockComments");
const mockCollections = require("./mockCollections");
const mockCollectionsPosts = require("./mockCollectionsPosts");

let client;
let database;

async function populate() {
    try {
        //
        //
        // connect to database
        await connectToDb();

        // delete previous data from database
        await clearCollections();

        //
        //
        // hash user passwords
        const users = await processUsers(mockUsers);

        // add users to database
        await addManyUsersToDatabase(users);
        console.log("inserting users: DONE");

        //
        //
        // add categories to database
        await addManyCategoriesToDatabase(mockCategories);
        console.log("inserting categories: DONE");

        //
        //
        // add categoryId and publisherId and delete category and publisher
        const posts = await processPosts(mockPosts);

        // add posts to database
        await addManyPostsToDatabase(posts);
        console.log("inserting posts: DONE");

        //
        //
        // create text index from post title for searching
        await createPostTitleTextIndex();
        console.log("create post title text index: DONE");

        //
        //
        // add PostId and UserId and delete post and user
        const comments = await processComments(mockComments);

        // add comments to database
        await addManyCommentsToDatabase(comments);
        console.log("inserting comments: DONE");

        //
        //
        // add userId and remove user
        const collections = await processCollections(mockCollections);

        // add collections to database
        await addManyCollectionsToDatabase(collections);
        console.log("inserting collections: DONE");

        //
        //
        // add collectionId and postId and remove collection and post
        const collectionsPosts = await processCollectionsPosts(mockCollectionsPosts);

        // add collections posts to database
        await addManyCollectionsPostsToDatabase(collectionsPosts);
        console.log("inserting collections posts: DONE");

        //
        //
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

    for (let user of usersList) {
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
    if (!category) throw new Error(`category with title: "${title}" was not found`);
    return category._id;
}

async function findUserId(username) {
    const user = await database.collection("users").findOne({ username });
    if (!user) throw new Error(`user with username: "${username}" was not found!`);
    return user._id;
}

async function addManyPostsToDatabase(posts) {
    await database.collection("posts").insertMany(posts);
}

async function createPostTitleTextIndex() {
    database.collection("posts").createIndex({ title: "text" });
}

async function processComments(comments) {
    const commentsList = [...comments];

    for (let comment of commentsList) {
        comment.postId = await findPostId(comment.post);
        delete comment.post;

        comment.userId = await findUserId(comment.user);
        delete comment.user;
    }

    return commentsList;
}

async function findPostId(title) {
    const post = await database.collection("posts").findOne({ title });
    if (!post) throw new Error(`post with title: "${title}" was not found!`);
    return post._id;
}

async function addManyCommentsToDatabase(comments) {
    await database.collection("comments").insertMany(comments);
}

async function processCollections(collections) {
    const collectionsList = [...collections];

    for (let collection of collectionsList) {
        collection.userId = await findUserId(collection.user);
        delete collection.user;
    }

    return collectionsList;
}

async function addManyCollectionsToDatabase(collections) {
    await database.collection("collections").insertMany(collections);
}

async function processCollectionsPosts(collectionsPosts) {
    const collectionsPostsList = [...collectionsPosts];

    for (let collectionPost of collectionsPostsList) {
        collectionPost.collectionId = await findCollectionId(collectionPost.collection);
        delete collectionPost.collection;

        collectionPost.postId = await findPostId(collectionPost.post);
        delete collectionPost.post;
    }

    return collectionsPostsList;
}

async function findCollectionId(title) {
    const collection = await database.collection("collections").findOne({ title });
    if (!collection) throw new Error(`collection with title: "${title}" was not found!`);
    return collection._id;
}

async function addManyCollectionsPostsToDatabase(collectionsPosts) {
    await database.collection("collections-posts").insertMany(collectionsPosts);
}
