// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const User = sequelize.define("user", {
//     id: {
//         type: Sequelize.INTEGER.UNSIGNED,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//         unique: true,
//     },
//     name: {
//         type: Sequelize.STRING(255),
//         allowNull: false,
//     },
//     email: {
//         type: Sequelize.STRING(255),
//         allowNull: false,
//         unique: true,
//     }
// });

// module.exports = User;

// const getDB = require("../util/database").getDb;
// const mongodb = require("mongodb");

// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//   }

//   save() {
//     const db = getDB();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection("users")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("users").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log("result user saved", result);
//       })
//       .catch((err) => {
//         console.log('err db.collection("users").insertUpdateOne', err);
//       });
//   }

//   addToCart(product) {
//     // const cartProduct = this.cart.items.findIndex((cp) => {
//     //   return cp._id === product._id;
//     // });
//     // const updatedCart = { items: [{ ...product, quantity: 1 }] };
//     const db = getDB();
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     // console.log('cartProductIndex', cartProductIndex);
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];
//     if (cartProductIndex >= 0) {
//       newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({ productId: product._id, quantity: newQuantity });
//     }
//     const updatedCart = { items: updatedCartItems };
//     return db
//       .collection("users")
//       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//   }

//   deleteItemFromCart(productID) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() !== productID.toString();
//     });
//     const db = getDB();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: this._id },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDB();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: this._id,
//             name: this.name,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
//       });
//   }

//   static findById(userId) {
//     const db = getDB();
//     return db
//       .collection("users")
//       .find({ _id: userId })
//       .next()
//       .then((user) => {
//         console.log("user db.collection.find({_id: userId}).next", user);
//         return user;
//       })
//       .catch((err) => {
//         console.log("err db.collection.find({_id: userId}).next", err);
//       });
//   }

//   getOrders() {
//     const db = getDB();
//     return db.collection("orders").find({ 'user._id': this._id }).toArray();
//   }

//   getCart() {
//     const db = getDB();
//     const productIds = this.cart.items.map((i) => {
//       return i.productId;
//     });
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((product) => {
//           return {
//             ...product,
//             quantity: this.cart.items.find((i) => {
//               return i.productId.toString() === product._id.toString();
//             }).quantity,
//           };
//         });
//       });
//   }
// }

// module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({ productId: product._id, quantity: newQuantity });
  }
  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeItemFromCart = function (productID) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productID.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
