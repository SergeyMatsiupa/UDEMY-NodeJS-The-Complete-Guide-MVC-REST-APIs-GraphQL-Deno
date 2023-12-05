// const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
// const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
// const expressHbs = require("express-handlebars");
// import { expressHbs } from 'express-handlebars';
// const Product = require("./models/product");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");
// // const db = require("./util/database");
const sequelize = require("./util/database");
// const mongoConnect = require("./util/database").mongoConnect;
// const mongodb = require("mongodb");

const controller404 = require("./controllers/404");

process.env.TZ = "Europe/Warsaw";
// console.log(new Date().toString());

// console.log('process.env.MARIADB_USER', process.env.MARIADB_USER);
;
const app = express();

app.set("view engine", "ejs");
// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
// app.set("view engine", "hbs");
// app.set("view engine", "pug");
app.set("views", "views");

// db.execute("select * from products")
//   .then((result) => {
//     // console.log("result", result);
//     console.log("result", result[0]);
//     console.log("result", result[1]);
//   })
//   .catch((err) => {
//     console.log("db.execute err", err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id).then((user) => {
    // console.log('user111', user);
    req.user = user;
    next();
  });
});
// app.use((req, res, next) => {
//   console.log("in the middleware");
//   next();
// });

// app.use((req, res, next) => {
// console.log('app.use', app.use);
// User.findByPk(1)
// User.findById(new mongodb.ObjectId("655d20fd628ef9ccc4217df5"))
// User.findOne({ email: "test@test.com" })
//   .then((user) => {
//     req.user = user;
//     // req.user = new User(user.name,user.email,user.cart,user._id);
//     // console.log('user111', user);
//     // console.log('req.user', req.user);
//     next();
//   })
//   .catch((err) => {
//     // console.log("err User.findByPk", err);
//     console.log("err User.findOne", err);
//   });
// });

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

// app.use("/add-product", (req, res, next) => {
//   console.log("in the another middleware");
//   // res.send("<h1>The 'Add Product' Page</h1>");
//   res.send(
//     '<form method="post" action="/product"><input type="text" name="title"><button type="submit">Add</button></form>'
//   );
// });

// app.post("/product", (req, res, next) => {
//   console.log('req.body', req.body);
// });

// app.use("/admin", adminData.routes);
app.use("/admin", adminRoutes);
app.use("/", authRoutes);

// app.use("/", (req, res, next) => {
//   console.log("in the another middleware");
//   res.send("<h1>Hello from Express!</h1>");
// });
app.use(shopRoutes);

// app.use((req, res, next) => {
//   // res.status(404).send("<h1>Page not found</h1>");
//   // res.status(404).sendFile(path.join(__dirname,"views", "404.html"));
//   res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
// });
app.use(controller404.get404);

// const server = http.createServer(app);

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User, { foreignKey: { unique: true } });
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// User.hasMany(Order);
// Order.belongsTo(User);
// Order.belongsToMany(Product, {through: OrderItem});
// Product.belongsToMany(Order, {through: CartItem});

// // server.listen(3000);
// // sequelize
//   // .sync({ force: true })
// sequelize
  // .sync({ alter: true })
  // .then((result) => {
    // console.log("sequelize.sync result", result);
    //     // app.listen(3000);
    // return User.findByPk(1);
  // })
  // .then((user) => {
    // if (!user) {
      // return User.create({ name: "MSV", email: "test@test.com" });
    // }
    // return user;
  // })
  // .then((user) => {
    // console.log("user sequelize.sync", user);
    //     user.getCart()
    //     .then((cart) => {
    //       if(!cart) {
    //         return user.createCart();
    //       }
  // })
  // .catch((err) => {
    // console.log("err user.getCart", err);
  // });
//   })
//   .then((cart) => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log("err sequelize.sync", err);
//   });

// mongoConnect(() => {
// mongoConnect((client) => {
// app.listen(3000);
// console.log("client", client);
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    // console.log('result mongoose.connect', result);
    // User.findOne({ email: "test@test.com" }).then((user) => {
    //   if (!user) {
    //     const user = new User({
    //       name: "MSV",
    //       email: "test@test.com",
    //       cart: { items: [] },
    //     });
    //     user.save();
    //   }
    // });
    app.listen(3000);
  })
  .catch((err) => {
    console.log("err mongoose.connect", err);
  });
