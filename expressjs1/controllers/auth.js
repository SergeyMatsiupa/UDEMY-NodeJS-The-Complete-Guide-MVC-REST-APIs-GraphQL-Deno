const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //   console.log('req.get("Cookie")', req.get("Cookie").split(";"));
  const cookieArr = req.get("Cookie") ? req.get("Cookie").split(";") : [];
  let cookieStr = "";
  cookieArr.forEach((element) => {
    if (element.trim().substring(0, 13) === "loggedIn=true") {
      cookieStr = element.trim().split("=")[1].trim();
    }
  });
  //   console.log("cookieStr", cookieStr);
  console.log("req.session.isLoggedIn", req.session.isLoggedIn);
  const isAuthenticated = cookieStr === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isAuthenticated,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  User.findOne({ email: email })

    // User.findOne({ email: "test@test.com" })
    .then((user) => {
      //   req.session.isLoggedIn = true;
      //   req.session.user = user;
      //   //   console.log("req.session.user", req.session.user);
      //   req.session.save((err) => {
      //     console.log("err req.session.save", err);
      //     res.redirect("/");
      //   });
      if (!user) {
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log("err req.session.save", err);
              res.redirect("/");
            });
          }
          return res.redirect("/login");
        })
        .catch((err) => {
          console.log("err bcrypt.compare", err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log("err User.findOne", err);
    });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((foundUser) => {
      if (foundUser) {
        // console.log('foundUser', foundUser);
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          // bcrypt.hash(password, 12).then(ps => {console.log('ps', ps)});
          //   console.log("hashedPassword", hashedPassword);
          const user = new User({
            password: hashedPassword,
            email: email,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          return res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log("err User.findOne({email: email})", err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("err req.session.destroy", err);
    res.redirect("/");
  });
};
