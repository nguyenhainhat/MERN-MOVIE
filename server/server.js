const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./src/routes/authRoute");
const userRoute = require("./src/routes/userRoute");
const listRoute = require("./src/routes/listRoute");



const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Route
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/list", listRoute);


mongoose.connect(process.env.DB_URL, () => {
    console.log("connect db successfully")
})

app.listen(8000, () => {
    console.log("Server is running")
})