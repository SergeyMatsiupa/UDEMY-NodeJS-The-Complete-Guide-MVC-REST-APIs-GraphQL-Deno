// const fs = require("fs");
// const path = require("path");
// const Cart = require("./cart");
// // const p = path.join(
// //   path.dirname(require.main.filename),
// //   "data",
// //   "products.json"
// // );
// const db = require("../util/database");

// // const products = [];

// // const getProductsFromFile = (cb) => {
// //   fs.readFile(p, (err, fileContent) => {
// //     console.log("fileContent", fileContent.length);
// //     if (err || fileContent.length === 0) {
// //       console.log("if-err");
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// module.exports = class Product {
//   constructor(id, title, imageUrl, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }

//   save = () => {
//     // fs.readFile(p, (err, fileContent) => {
//     //   let products = [];
//     //   if (!err) {
//     //     products = JSON.parse(fileContent);
//     //   }
//     //   products.push(this);
//     //   fs.writeFile(p, JSON.stringify(products), (err) => {
//     //     console.log("err", err);
//     //   });
//     // });
//     // // products.push(this);
//     // getProductsFromFile((products) => {
//     //   // products.forEach((product) => {product.id = (product.id ? product.id : Math.random().toString())});
//     //   if (this.id) {
//     //     const existingProductIndex = products.findIndex(
//     //       (product) => (product.id = this.id)
//     //     );
//     //     const updatedProducts = [...products];
//     //     updatedProducts[existingProductIndex] = this;
//     //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//     //       console.log("err", err);
//     //     });
//     //   } else {
//     //     this.id = Math.random().toString();
//     //     products.push(this);
//     //     fs.writeFile(p, JSON.stringify(products), (err) => {
//     //       console.log("err", err);
//     //     });
//     //   }
//     // });
//     return db.execute(
//       "insert into products (title, price, description, imageUrl) values (?, ?, ?, ?)",
//       [this.title, this.price, this.description, this.imageUrl]
//     );
//   };

//   static deleteById = (id) => {
//     // getProductsFromFile((products) => {
//     //   const product = products.find(prod => prod.id === id);
//     //   const updatedProducts = products.filter((p) => p.id !== id);
//     //   fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//     //     if (!err) {
//     //       Cart.deleteProduct(id, product.price);
//     //     }
//     //     console.log("err", err);
//     //   });
//     // });
//   };
//   static fetchAll = () => {
//     // static fetchAll = (cb) => {
//     //     fs.readFile(p, (err, fileContent) => {
//     //         if(err) {
//     //             cb([]);
//     //         }
//     //         cb(JSON.parse(fileContent));
//     //     });
//     //     // return products;
//     // getProductsFromFile(cb);
//     return db.execute("select * from products");
//   };

//   static findById = (id) => {
//     // static findById = (id, cb) => {
//     // getProductsFromFile((products) => {
//     //   const product = products.find((p) => p.id === id);
//     //   cb(product);
//     // });
//     return db.execute("select * from products where id = ?", [id]);
//   };
// };

// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER.UNSIGNED,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//     unique: true
//   },
//   title: {
//     type: Sequelize.STRING(255),
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING(255),
//     allowNull: true,
//   }
// });

// module.exports = Product;

// const mongoConnect = require("./util/database");
// const getDB = require("../util/database").getDb;
// const mongodb = require("mongodb");

// class Product {
//   constructor(title, imageUrl, price, description, id, userId) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//     this._id = id ? new mongodb.ObjectId(id) : id;
//     this.userId = userId;
//   }

//   save = () => {
//     const db = getDB();
//     let dbOp;
//     // console.log("this111", this);
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         // .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log('result db.collection("products").insertOne', result);
//       })
//       .catch((err) => {
//         console.log('err db.collection("products").insertOne', err);
//       });
//   };

//   static fetchAll = () => {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => {
//         console.log('err db.collection("products").find().toArray()', err);
//       });
//   };

//   static findById(productID) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(productID) })
//       .next()
//       .then((product) => {
//         console.log("product mongodb.ObjectId(productID)}).next()", product);
//         return product;
//       })
//       .catch((err) => {
//         console.log("err mongodb.ObjectId(productID)}).next()", err);
//       });
//   }

//   static deleteById(productID) {
//     const db = getDB();
//       console.log('productID111', productID);
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(productID) })
//       .then(result => {
//         console.log('Product Deleted result', result);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   }
// }

// module.exports = Product;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  }
})

module.exports = mongoose.model("Product", productSchema);