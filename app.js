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
  "mongodb+srv://user:password123!@cluster0.vuekx.mongodb.net/cluster0?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.connection
  .once("open", function () {
    console.log("Conection has been made!");
  })
  .on("error", function (error) {
    console.log("Error is: ", error);
  });

//listen
app.listen(process.env.PORT || 8080);
