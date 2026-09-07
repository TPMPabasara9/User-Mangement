
const express = require("express");
const rolesRoute = require("./routes/roll_routes");
const userRoute = require("./routes/user_routes");
const authRoute = require("./routes/auth_routes");
console.log("Express loaded");

const app = express();

app.use(express.json());

app.use("/api/roles", rolesRoute);
app.use("/api/users", userRoute);
app.use("/api/auth",authRoute );

app.get("/",(req,res) =>{
    res.send("Welcome to the Role Management API");
})

module.exports = app;