require("dotenv").config();
const mongoose = require("mongoose");

// // const mongoURI = "mongodb://localhost/test";
const mongoURI = process.env.DB_CONN_STRING;

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToMongo;
