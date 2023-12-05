// // const mysql = require("mysql2");

// // const pool = mysql.createPool({
    // host: process.env.MARIADB_HOST,
    // database: process.env.MARIADB_DATABASE,
    // user: process.env.MARIADB_USER,
    // password: process.env.MARIADB_PASSWORD,
    // port: process.env.MARIADB_PORT
// // });

// // module.exports = pool.promise();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.MARIADB_DATABASE,
  process.env.MARIADB_USER,
  process.env.MARIADB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
  }
);

module.exports = sequelize;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // callback(client);
      console.log("Connected!");
      _db = client.db();
      // console.log("_db", _db);
      callback();
    })
    .catch((err) => {
      console.log("err MongoClient.connect", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    return "No database found!";
  }
};

// module.exports = mongoConnect;
exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
