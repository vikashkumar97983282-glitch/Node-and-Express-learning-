const express = require('express');
const router = express.Router();
const userModel = require('../model/user')
const productModel = require('../model/product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const user = require('../model/user');
const isLogin = require('../utils/registerCookies');

router.use(cookieParser());


router.get("/", async (req,res)=>{
    const data = await userModel.find().populate('product');
    res.status(200).send(data);
});

router.post('/register', async (req,res)=>{
    let {name,email,password,age,product} = req.body;

    let user = await userModel.findOne({email});

    if(user) return res.status(400).send("user already exists");

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
            const data = await userModel.create({
                name,
                email,
                password:hash,
                age,
                product
            })
        })
        res.status(201).send("user registered successfully")
    })
    
})

router.get('/login', (req,res)=>{
    // res.clearCookie('token');
    console.log(req.user)
    res.status(200).send("login page");
})


router.post('/login' , async (req,res)=>{

    res.clearCookie('token');

    let {email,password} = req.body;
    let data = await userModel.findOne({email});

    if(!data) return res.status(404).send("user not found");

    bcrypt.compare(password, data.password, function(err, result){
        if(!result) {

            return res.status(401).send("something went wrong!");
        } 

        let token = jwt.sign({email:email}, "dangertiger")
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24
        })
        res.status(200).send({message:"login successful"});
    });

});


router.post('/logout', isLogin, (req,res)=>{
    res.clearCookie("token");
    res.status(200).send("logout successful");
});


router.get('/profile', isLogin, async (req,res)=>{
    let data = await userModel.find();
    console.log(req.user)
    res.send(data);
})

router.post('/addproduct', isLogin, async (req,res)=>{
    let {productName, price, description} = req.body;
    let user = await userModel.findOne({email: req.user.email});
    console.log(user)

    const product = await productModel.create({
        productName,
        price,
        description,
        user: user._id
    })
    user.product.push(product._id);
    await user.save();
    res.send(user,product)


})

router.get('/products', isLogin, async (req,res)=>{
    let product = await userModel.findOne({email: req.user.email}).populate('product')
    // let data = await user.populate('product')
    res.send(product.product);
})












module.exports = router;