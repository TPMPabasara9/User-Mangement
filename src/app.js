console.log("APP.JS STARTED");

const express = require("express");

console.log("Express loaded");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world! Express js is working");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});