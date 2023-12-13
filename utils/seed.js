const connection = require("../config/connection");
const { Thoughts, User } = require("../models");
const { getRandomName, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let userCheck = await connection.db
    .listCollections({ name: "user" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const users = [];
  for (let i = 0; i < 20; i++) {
    const thoughts = getRandomThoughts(20);

    const fullName = getRandomName();
    const first = fullName.split(" ")[0];
    const last = fullName.split(" ")[1];

    const username = `${first.toLowerCase()}_${last.toLowerCase()}`;

    if (username !== null) {
      users.push({
        first,
        last,
        username,
        thoughts,
      });
    }
  }

  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
