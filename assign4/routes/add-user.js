const express = require("express");
const router = express.Router();

const users = [];

router.get("/", (req, res, next) => {
    res.render("add-user", {pageTitle: "Add User"});
});

router.post("/", (req, res, next) => {
    users.push({username: req.body.username});
        console.log('post router users', users);
    res.redirect("/users");
});

exports.routes = router;
exports.users = users;