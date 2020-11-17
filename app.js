const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

app.use(cors());
//middleware
// app.use('/posts',()=>{
//     console.log("hello this is a middleware running");
// })

//import routes
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");

app.use(bodyParser.json());
app.use("/posts", postsRoute);
app.use("/users", usersRoute);
//create routes
app.get("/", (req, res) => {
  res.send("We are on home.");
});

//connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

//listen
app.listen(3000);
