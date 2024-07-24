const express = require("express");
const app = express();
const mongoose = require("mongoose")
require("dotenv").config()
var cookieParser= require('cookie-parser')
const cors = require("cors")
const songRouter = require("./routes/router")
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.use(songRouter)
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("not connected");
  });