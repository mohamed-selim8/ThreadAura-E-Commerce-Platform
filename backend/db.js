// mongoose connection
require("dotenv/config");
const mongoose = require("mongoose");
async function connection() {
  await mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    console.log("mongoose connected!");
  });
}

connection();

module.exports = connection;
