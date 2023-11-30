const { connect, connection } = require("mongoose");

process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialDB";

connect(connectionString);

module.exports = connection;
