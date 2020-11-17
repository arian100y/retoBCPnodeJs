const express = require('express');
const router = express.Router();
const Post = require('../Models/Posts')
const userRouter = require('./users')
const jwt = require('jsonwebtoken')
// router.get('/',(req,res)=>{
//     res.send('We are on posts.')
// })

router.get('/specific',(req,res)=>{
    res.send("FAFA");
})

function authenticateToken(req,res,next){
    const  authHeader = req.headers['authorization']
    const token  =authHeader && authHeader.split(' ')[1]

    if(token === null) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if( err) return res.sendStatus(403);
        req.user  = user
        next();
    })
}
//GET BACK ALL POSTS
router.get('/',authenticateToken, async (req,res)=>{
    let posts = []
    
    await Post.find({username : req.user.username.toString()},(error,data)=>{
        if(error){
            console.log(error)
        }else{
            
            posts = data;
        }

    }); 
    try{
        
        res.json(posts);
    }catch (err){
        res.json({message:err});
    }
})

//POST POSTS
router.post('/',async (req,res)=>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description,
        username:req.body.username
    })
    
    try{
         const savedPost = await post.save();   
         res.json(savedPost);
    }catch (err){
        res.json({message:err});
    }
})
//SPECIFIC POST
router.get('/:postId', async (req,res)=>{
    try{
        console.log(req.params.postId);
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch (err){
        res.json({message:err});
    }
})

module.exports = router;