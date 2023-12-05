const express = require("express");
const router = express.Router();
const addUserData = require("./add-user");

router.get("/users", (req, res, next) => {
    res.render("users", {pageTitle: "Users", users: addUserData.users});
});

module.exports = router;