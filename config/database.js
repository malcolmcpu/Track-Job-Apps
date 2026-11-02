require('dotenv').config();
// config/database.js
module.exports = {
  url: process.env.MONGO_URI,
  dbName: process.env.DB_NAME,
};
