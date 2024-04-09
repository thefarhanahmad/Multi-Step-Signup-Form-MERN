const mongoose = require("mongoose");
const DATABASE_URL = process.env.DB_URL;

function dbConnection() {
  mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("DB not connecting");
    });
}

module.exports = dbConnection;
