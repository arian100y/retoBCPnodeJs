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
//POST USERS
// router.post("/", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     console.log(hashedPassword);
//     const user = new User({
//       username: req.body.username,
//       password: hashedPassword,
//     });
//     const savedUser = await user.save();
//     res.status(201).send();
//   } catch (err) {
//     res.json({ message: err });
//   }

//   // res.json(savedUser);
// });
// router.post("/login", async (req, res) => {
//   let user = new User();
//   await User.find({ username: req.body.username.toString() }, (error, data) => {
//     if (error) {
//       console.log(error);
//     } else {
//       user = data[0];
//     }
//   });
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       const userSign = {
//         username: req.body.username,
//         password: req.body.password,
//       };
//       console.log(userSign);
//       const accessToken = jwt.sign(userSign, process.env.ACCESS_TOKEN_SECRET);
//       res.json({ accessToken: accessToken });
//       //res.send("Success!");
//     } else {
//       res.send("Not allowed");
//     }
//   } catch {
//     res.status(500).send();
//   }

//   // res.json(savedUser);
// });

// function authenticateToken(req, res, nex) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token === null) return res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

router.post("/logout", async (req, res) => {
  let user = new User();
  await User.find({ username: req.body.username.toString() }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      user = data[0];
    }
  });
  console.log(user);
  user.loggedIn = false;
  await user.save();
  res.status(200).send();
});

const postSubs = async (url, id) => {
  console.log("Afpasfs");
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

//SPECIFIC POST
// router.get('/:postId', async (req,res)=>{
//     try{
//         console.log(req.params.postId);
//         const post = await Post.findById(req.params.postId);
//         res.json(post);
//     }catch (err){
//         res.json({message:err});
//     }
// })

module.exports = router;
