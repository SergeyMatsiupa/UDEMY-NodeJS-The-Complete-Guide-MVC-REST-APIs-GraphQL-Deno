const express = require("express");
const router = express.Router();
// const path = require("path");
// const rootDir = require("../util/path");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");


// const products = [];

// /admin/add-product => GET
// router.get("/admin/add-product", (req, res, next) => {
// router.get("/add-product", (req, res, next) => {
//   console.log("in the another middleware");
//   // res.send("<h1>The 'Add Product' Page</h1>");
//   //   res.send(
//   //     '<form method="post" action="/admin/add-product"><input type="text" name="title"><button type="submit">Add</button></form>'
//   //   );
//   // res.sendFile(path.join(__dirname,"..","views", "add-product.html"));
//   // res.sendFile(path.join(rootDir, "views", "add-product.html"));
//   // res.render("add-product", {pageTitle: "Add Product", path: "/admin/add-product"});
//   res.render("add-product", {pageTitle: "Add Product", path: "/admin/add-product", formsCSS: true, productsCSS: true, addProductActive: true});
// });
router.get("/add-product", isAuth, adminController.getAddProduct);


// /admin/add-product => POST
// router.post("/admin/add-product", (req, res, next) => {
// router.post("/add-product", (req, res, next) => {
//   console.log("req.body", req.body);
//   products.push({ title: req.body.title });
//   res.redirect("/");
// });
router.post("/add-product", isAuth, adminController.postAddProduct);

router.get("/edit-product/:productID", isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth, adminController.postEditProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

// exports.routes = router;
// exports.products = products;
module.exports = router;
