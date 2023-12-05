const express = require("express");
const bodyParser = require("body-parser");
const addUserData = require("./routes/add-user");
const usersRoutes = require("./routes/users");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(addUserData.routes);

app.use(usersRoutes);

app.use((req, res, next) => {
    res.status(404).render("404",  { pageTitle: "Page Not Found" });
});

app.listen(3000);