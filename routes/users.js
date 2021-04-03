const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const axios = require("axios");

// router.get('/',(req,res)=>{
//     res.send('We are on posts.')
// })

const url = "https://user-subscriptions.herokuapp.com/user-subscriptions/all/";

const getData = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

router.get("/specific", (req, res) => {
  res.send("FAFA");
});

//GET BACK ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/logout", async (req, res) => {
  let user = new User();
  await User.find({ username: req.body.username.toString() }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      user = data[0];
    }
  });

  user.loggedIn = false;
  await user.save();
  res.status(200).send();
});

const postSubs = async (url, id) => {
  try {
    const response = await axios.post(`${url}${id}`);
  } catch (error) {
    console.log(error);
  }
};

router.post("/reto", async (req, res) => {
  let user = new User();
  await User.find({ username: req.body.username.toString() }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      user = data[0];
    }
  });
  //await getData(url);

  try {
    if (user === undefined) {
      const newUser = new User({
        username: req.body.username,
        password: "none",
        loggedIn: true,
      });
      postSubs(url, newUser.username);
      console.log(newUser);
      const savedUser = await newUser.save();
      res.status(201).send();
    } else {
      if (user.loggedIn === true) {
        res.status(500).send();
      } else {
        user.loggedIn = true;
        await user.save();
        res.status(200).send();
      }
    }

    //console.log(req.body);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
