const express = require("express");
const path = require("path");
const app = express();

const rootRoutes = require("./routes/index");
const usersRoutes = require("./routes/users");

app.use(express.static(path.join(__dirname,"public")));

app.use(rootRoutes);

app.use(usersRoutes);

app.listen(3000);