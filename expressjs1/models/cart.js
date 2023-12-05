// const path = require("path");
// const fs = require("fs");

// const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

// module.exports = class Cart {
//   static AddProduct(id, price) {
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err && fileContent.length !== 0) {
//         cart = JSON.parse(fileContent);
//       }
//       const existingProductIndex = cart.products.findIndex((p) => p.id === id);
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty += 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         // add new product
//         updatedProduct = { qty: 1, id: id };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice += parseFloat(price);
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log("cart write err", err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err || fileContent.length === 0) {
//         return;
//       }
//       const updatedCart = { ...JSON.parse(fileContent) };
//       const product = updatedCart.products.find((product) => product.id === id);
//       console.log("product", product);
//       if (!product) {
//         return;
//       }
//       const productQty = product.qty;
//       updatedCart.products = updatedCart.products.filter(
//         (product) => product.id !== id
//       );
//       updatedCart.totalPrice =
//         updatedCart.totalPrice - productPrice * productQty;
//       fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//         console.log("cart write err", err);
//       });
//     });
//   }

//   static getCart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (err) {
//         cb(null);
//       } else {
//         cb(cart);
//       }
//     });
//   }
// };

const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Cart;
