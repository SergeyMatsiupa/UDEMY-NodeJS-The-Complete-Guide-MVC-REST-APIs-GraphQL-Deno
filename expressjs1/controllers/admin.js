const products = [];
// const Cart = require("../models/cart");
const Product = require("../models/product");
// const User = require("../models/user");
// const mongodb = require("mongodb");
// const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  // if (!req.session.isLoggedIn) {
  //   return res.redirect("/login");
  // }
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    // formsCSS: true,
    // productsCSS: true,
    // addProductActive: true,
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProduct = (req, res, next) => {
  // products.push({ title: req.body.title });
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(null, title, imageUrl, price, description);
  // product.save();
  // product
  //   .save()
  //   .then((result) => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log("err", err);
  // //   });
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId: req.user.id,
  // })
  // const product = new Product(title, imageUrl, price, description, null, req.user._id);
  // req.user
  //   .createProduct({
  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    // userId: req.user,
    userId: req.session.user,
  });
  product
    .save()
    .then((result) => {
      console.log("result Product.create", result);
      // console.log("Created Product");
      // res.redirect("/");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("err Product.create", err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productID = req.params.productID;
  // Product.findById(productID, (product) => {
  // Product.findByPk(productID)
  // req.user
  //   .getProducts({ where: { id: productID } })
  Product.findById(productID)
    // .then((products) => {
    .then((product) => {
      // const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      // console.log("getEditProduct product", product);
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log("err Product.findByPk", err);
    });
  // });
};

exports.postEditProduct = (req, res, next) => {
  // console.log("postEditProduct req.body", req.body);
  const productID = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  // const updatedProduct = new Product(
  //   productID,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedPrice,
  //   updatedDescription
  // );
  // updatedProduct.save();
  // Product.findByPk(productID)
  //   .then((product) => {
  //     console.log("productID Product.findByPk", productID);
  //     product.title = updatedTitle;
  //     product.price = updatedPrice;
  //     product.imageUrl = updatedImageUrl;
  //     product.description = updatedDescription;
  //     return product.save();
  //   })
  // const product = new Product(
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedPrice,
  //   updatedDescription,
  //   // new ObjectId(productID)
  //   productID,
  //   req.user._id
  // );
  // product
  //   .save()
  Product.findById(productID)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("successfully saved!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("err Product.findById(productID)", err);
    });
};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //   });
  // });
  // Product.findAll()
  // req.user
  //   .getProducts()
  // Product.fetchAll()
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log("Product.findAll err", err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productID;
  // Product.deleteById(prodId);
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  //   .then((result) => {
  //     console.log("successfully destroyed");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.log("err Product.findByPk", err);
  //   });
  // Product.deleteById(prodId)
  Product.findByIdAndDelete(prodId)
    .then((result) => {
      console.log("successfully destroyed");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("err Product.deleteById", err);
    });
};
