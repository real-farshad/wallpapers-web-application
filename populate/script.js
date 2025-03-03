require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const mockUsers = require("./mockUsers");
const mockCategories = require("./mockCategories");
const mockWallpapers = require("./mockWallpapers");
const mockComments = require("./mockComments");
const mockCollections = require("./mockCollections");
const mockCollectionsRecords = require("./mockCollectionsRecords");

let client;
let database;

async function populate() {
  try {
    console.log("Connected to mongodb...");
    await connectToDb();

    console.log("clearing database... \n");
    await clearCollections();

    console.log("inserting users...");
    const users = await processUsers(mockUsers);
    await saveUsers(users);

    console.log("inserting categories...");
    await saveCategories(mockCategories);

    console.log("inserting wallpapers...");
    const wallpapers = await processWallpapers(mockWallpapers);
    await saveWallpapers(wallpapers);

    console.log("create wallpapers title text index...");
    await createWallpapersTitleTextIndex();

    console.log("inserting comments...");
    const comments = await processComments(mockComments);
    await saveComments(comments);

    console.log("inserting collections...");
    const collections = await processCollections(mockCollections);
    await saveCollections(collections);

    console.log("create collection title text index...");
    await createCollectionTitleTextIndex();

    console.log("inserting collections records... \n");
    const collectionsRecords = await processCollectionsRecords(
      mockCollectionsRecords
    );
    await saveCollectionsRecords(collectionsRecords);

    console.log("Disconnected from mongodb...");
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
}

async function disconnectFromDB() {
  await client.close();
}

async function clearCollections() {
  const result = await database.command({
    listCollections: 1.0,
    authorizedCollections: true,
    nameOnly: true,
  });

  const dbCollectionsList = result.cursor.firstBatch;
  for (const collection of dbCollectionsList) {
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

async function saveUsers(users) {
  await database.collection("users").insertMany(users);
}

async function saveCategories(categories) {
  await database.collection("categories").insertMany(categories);
}

async function processWallpapers(wallpapers) {
  const wallpapersList = [...wallpapers];

  for (let wallpaper of wallpapersList) {
    const category = await findCategoryByTitle(wallpaper.category);
    wallpaper.categoryId = category._id;
    delete wallpaper.category;

    const user = await findUserByName(wallpaper.publisher);
    wallpaper.publisherId = user._id;
    delete wallpaper.publisher;
  }

  return wallpapersList;
}

async function findCategoryByTitle(title) {
  const category = await database.collection("categories").findOne({ title });
  if (!category) {
    throw new Error(`category with title: "${title}" was not found`);
  } else return category;
}

async function findUserByName(username) {
  const user = await database.collection("users").findOne({ username });
  if (!user) {
    throw new Error(`user with username: "${username}" was not found!`);
  } else return user;
}

async function saveWallpapers(wallpapers) {
  await database.collection("wallpapers").insertMany(wallpapers);
}

async function createWallpapersTitleTextIndex() {
  await database.collection("wallpapers").createIndex({ title: "text" });
}

async function processComments(comments) {
  const commentsList = [...comments];

  for (let comment of commentsList) {
    const wallpaper = await findWallpaperByTitle(comment.wallpaper);
    comment.wallpaperId = wallpaper._id;
    delete comment.wallpaper;

    const user = await findUserByName(comment.user);
    comment.userId = user._id;
    delete comment.user;
  }

  return commentsList;
}

async function findWallpaperByTitle(title) {
  const wallpaper = await database.collection("wallpapers").findOne({ title });

  if (!wallpaper) {
    throw new Error(`wallpaper with title: "${title}" was not found!`);
  } else return wallpaper;
}

async function saveComments(comments) {
  await database.collection("comments").insertMany(comments);
}

async function processCollections(collections) {
  const collectionsList = [...collections];

  for (let collection of collectionsList) {
    const user = await findUserByName(collection.user);
    collection.userId = user._id;
    delete collection.user;
  }

  return collectionsList;
}

async function saveCollections(collections) {
  await database.collection("collections").insertMany(collections);
}

async function createCollectionTitleTextIndex() {
  await database.collection("collections").createIndex({ title: "text" });
}

async function processCollectionsRecords(collectionsRecords) {
  const collectionsRecordsList = [...collectionsRecords];

  for (let collectionRecord of collectionsRecordsList) {
    const collection = await findCollectionByTitle(collectionRecord.collection);
    collectionRecord.collectionId = collection._id;
    delete collectionRecord.collection;

    const wallpaper = await findWallpaperByTitle(collectionRecord.wallpaper);
    collectionRecord.wallpaperId = wallpaper._id;
    delete collectionRecord.wallpaper;
  }

  return collectionsRecordsList;
}

async function findCollectionByTitle(title) {
  const collection = await database
    .collection("collections")
    .findOne({ title });

  if (!collection) {
    throw new Error(`collection with title: "${title}" was not found!`);
  } else return collection;
}

async function saveCollectionsRecords(collectionsRecords) {
  await database
    .collection("collections-records")
    .insertMany(collectionsRecords);
}
