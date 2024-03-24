const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");
const colors = require("colors");

dotenv.config({
  path: path.resolve(
    __dirname,
    `../${
      process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development"
    }.env`
  ),
});

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "postgresql",
    // dialectOptions: { 
    //   ssl: { 
    //     rejectUnauthorized: false, // very important 
    //   } 
    // } 
   }
);

console.log(`NODE_ENV=${process.env.NODE_ENV}`.yellow);

module.exports = db;
