// mongoose connection
const mongoose = require("mongoose");
async function connection() {
  await mongoose
    .connect(
      `mongodb+srv://nam98333_db_user:BBT8j8Sn2ylP4iOt@cluster0.kv3vrys.mongodb.net/`,
    )
    .then(() => {
      console.log("mongoose connected ,hello!");
    });
}

connection();

module.exports = connection;
