const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
    console.log("in the middleware 1");
    // res.send("<h1>return after 1st middleware</h2>");
    // next();
    res.send("<h1>users</h2>");
});
app.use("/", (req, res, next) => {
    console.log("in the middleware 2");
    // res.send("<h1>return after 2nd middleware</h2>");
    res.send("<h1>ROOT</h2>");
});

app.listen(3000);