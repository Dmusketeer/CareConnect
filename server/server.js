const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//port
const port = process.env.PORT || 8080;

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
// app.use("/api/v1/admin", require("./routes/adminRoutes"));
// app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on Port ${process.env.PORT}`
      .bgGreen.red
  );
});
