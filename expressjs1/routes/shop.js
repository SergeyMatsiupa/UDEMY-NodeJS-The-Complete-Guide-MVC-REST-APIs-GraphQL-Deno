const express = require("express");
const router = express.Router();
// const path = require("path");
// const rootDir = require("../util/path");
// const adminData = require("./admin");
// const adminController = require("../controllers/admin");
const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");


// router.get("/", (req, res, next) => {
  //   console.log("in the another middleware");
  //   res.send("<h1>Hello from Express!</h1>");
  //   res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  // console.log("adminData.products", adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  // const products = adminData.products;
  // res.render("shop", {prods: products, pageTitle: "Shop", path: "/"});
//   res.render("shop", {
//     prods: products,
//     pageTitle: "Shop",
//     path: "/",
//     hasProducts: products.length > 0,
//     productsCSS: true,
//     shopActive: true
//   });
// });
// router.get("/", adminController.getProducts);
router.get("/", shopController.getIndex);

// router.get("/products", adminController.getProducts);
router.get("/products", shopController.getProducts);

router.get("/products/:productID", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteItem);

router.get("/checkout", isAuth, shopController.getCheckout);

router.get("/orders", isAuth, shopController.getOrders);

router.post("/create-order", isAuth, shopController.postOrder);

module.exports = router;
