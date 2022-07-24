const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// import route
const authRoute = require("./src/routes/authRoute");
const userRoute = require("./src/routes/userRoute");
const tvRoute = require("./src/routes/tvRoute");
const movieRoute = require("./src/routes/movieRoute");
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
app.use("/tv", tvRoute);
app.use("/movie", movieRoute);


mongoose.connect(process.env.DB_URL, () => {
    console.log("connect db successfully")
})

app.listen(8000, () => {
    console.log("Server is running")
})