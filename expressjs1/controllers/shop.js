const products = [];
const Order = require("../models/order");
// const Cart = require("../models/cart");
// const OrderItem = require("../models/order-item");
const Product = require("../models/product");
// const User = require("../models/user");

exports.getCart = (req, res, next) => {
  req.user
  // req.session.user
    // .getCart()
    // .then((cart) => {
    //   return cart
    //     .getProducts()
    //     .then((products) => {
    //       // console.log('products111', products);
    //       res.render("shop/cart", {
    //         path: "/cart",
    //         pageTitle: "Your Cart",
    //         products: products,
    //       });
    //     })
    //     .catch((err) => {
    //       console.log("err cart.getProducts()", err);
    //     });
    // })
    .populate("cart.items.productId")
    // .then((products) => {
    .then((user) => {
      // console.log(user.cart.items);
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log("err req.user.getCart", err);
    });
  // Cart.getCart((cartData) => {
  //   Product.fetchAll((products) => {
  //     // console.log("getCart cartData", cartData);
  //     const cartProducts = [];
  //     for (const product of products) {
  //       const cartProduct = cartData.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProduct) {
  //         cartProducts.push({ productData: product, qty: cartProduct.qty });
  //       }
  //     }
  //     // console.log("getCart cartProducts", cartProducts);
  //     res.render("shop/cart", {
  //       pageTitle: "Your Cart",
  //       path: "/cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const productID = req.body.productID;
  // console.log('productID', productID);
  // Product.findById(productID, (product) => {
  //   Cart.AddProduct(productID, product.price);
  // });
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     // console.log("cart111", cart);
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: productID } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       // product already in the cart
  //       product = products[0];
  //     }
  //     if (product) {
  //       // product already in the cart
  //       newQuantity = product.cart_item.quantity + 1;
  //       return product;
  //     }
  //     return Product.findByPk(productID);
  //   })
  //   .then((product) => {
  //     // console.log('newQuantity', newQuantity);
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity },
  //     });
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => {
  //     console.log("err User.getCart", err);
  //   });
  Product.findById(productID)
    .then((product) => {
      const user = req.user;
      // const user = req.session.user;
      return user.addToCart(product);
    })
    .then((result) => {
      // console.log("user.addToCart(product) result", result);
      res.redirect("/cart");
    });
};

exports.postCartDeleteItem = (req, res, next) => {
  const productID = req.body.productID;
  // Product.findById(productID, (product) => {
  //   Cart.deleteProduct(productID, product.price);
  // });
  // req.user
  // .getCart()
  //   .then((cart) => {
  //     // console.log('cart111', cart);
  //     return cart.getProducts({ where: { id: productID } });
  //   })
  //   .then((products) => {
  //     const product = products[0];
  //     return product.cart_item.destroy();
  //   })
  req.user
  // req.session.user
    // .deleteItemFromCart(productID)
    .removeItemFromCart(productID)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      // console.log("err req.user.getCart", err);
      console.log("err req.user.deleteItemFromCart(productID)", err);
    });
};

// exports.getProducts = (req, res, next) => {
exports.getIndex = (req, res, next) => {
  // const products = Product.fetchAll((products) => {
  //   res.render("shop/index", {
  //     prods: products,
  //     pageTitle: "Shop",
  //     path: "/",
  //     hasProducts: products.length > 0,
  //     productsCSS: true,
  //     shopActive: true,
  //   });
  // });
  // Product.fetchAll()
  //   .then(([rows, fieldsInfo]) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "Shop",
  //       path: "/",
  //       hasProducts: rows.length > 0,
  //       productsCSS: true,
  //       shopActive: true,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log("Product.fetchAll err", err);
  //   });
  // Product.findAll()
  // Product.fetchAll()
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log("Product.findAll err", err);
    });
};

exports.getProducts = (req, res, next) => {
  // const products = Product.fetchAll((products) => {
  //   res.render("shop/product-list", {
  //     prods: products,
  //     pageTitle: "All Products",
  //     path: "/products",
  //   });
  // });
  // Product.fetchAll()
  //   .then(([rows, fieldsInfo]) => {
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log("Product.fetchAll err", err);
  //   });
  // Product.fetchAll()
  Product.find()
    // .select("title -_id")
    // .populate("userId", "name")
    .then((products) => {
      // console.log('products', products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log("Product.findAll err", err);
    });
};

exports.getProduct = (req, res, next) => {
  const productID = req.params.productID;
  // console.log('productID', productID);
  // Product.findById(productID, (product) => {
  //   // console.log('product', product);
  //   res.render("shop/product-details", {
  //     pageTitle: product.title,
  //     path: "/products",
  //     product: product,
  //   });
  // });
  // Product.findById(productID)
  //   .then(([product]) => {
  // Product.findByPk(productID)
  // console.log("productID111", productID);
  Product.findById(productID)
    .then((product) => {
      // console.log("product1111", product);
      res.render("shop/product-details", {
        pageTitle: product.title,
        path: "/products",
        product: product,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      // console.log("err Product.findById", err);
      console.log("err Product.findByPk", err);
    });
  // Product.findAll({ where: { id: productID } }).then((products) => {
  //   res.render("shop/product-details", {
  //     pageTitle: products[0].title,
  //     path: "/products",
  //     product: products[0],
  //   });
  // });
  // res.redirect("/");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.getOrders = (req, res, next) => {
  //
  // req.session.user;
  // .getOrders({ include: Product })
  // .getOrders()
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      console.log("orders", orders);
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log("err req.user.getOrders", err);
    });
};

exports.postOrder = (req, res, next) => {
  // let fetchedCart;
  // req.user
  // .getCart()
  // .then((cart) => {
  //   fetchedCart = cart;
  //   return cart.getProducts();
  // })
  // .then((products) => {
  //   // console.log('products', products);
  //   return req.user
  //     .createOrder()
  //     .then((order) => {
  //       return order.addProducts(
  //         products.map((product) => {
  //           product.order_item = { quantity: product.cart_item.quantity };
  //           return product;
  //         })
  //       );
  //     })
  //     .catch((err) => {
  //       console.log("err req.user.createOrder", err);
  //     });
  // })
  // .then((result) => {
  //   return fetchedCart.setProducts(null);
  // })
  // req.user
  // .addOrder()
  req.user
  // req.session.user
    .populate("cart.items.productId")
    // .then((result) => {
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { product: { ...i.productId._doc }, quantity: i.quantity };
      });
      const order = new Order({
        // user: { userId: req.user, name: req.user.name },
        user: { userId: req.session.user, name: req.session.user.name },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
      // return req.session.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log("err req.user.getCart().the", err);
    });
};
