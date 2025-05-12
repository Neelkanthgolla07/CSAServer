
const express= require("express");

const {Router}=express

const jwt=require("jsonwebtoken");

const {JWT_USER_PASSWORD}= require("../config")

const {userModel,purchaseModel} = require("../db")

const userRouter =Router();

const bcrypt = require("bcrypt")

const {z} = require("zod")

const {userAuth} = require("../middleware/userMw");


// function auth(req, res, next) {
//     const token = req.headers.token;

//     const response = jwt.verify(token, JWT_USER_PASSWORD);

//     console.log(response)

//     if (response.id) {
//         req.userId=response.id;
//         req.headers.id = response.id;
//         next();
//     } else {
//         res.status(403).json({
//             message: "Incorrect creds"
//         })
//     }
// }

userRouter.post("/signup",async function(req,res){

    
    const requiredbody = z.object({
        email: z.string().min(3).max(100),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100),
        password: z.string().min(3).max(30)
    })

    // const parsedData = requiredBody.parse(req.body)
    const parsedDataWithSuccess = requiredbody.safeParse(req.body)

    if(!parsedDataWithSuccess.success){
        res.json({
            message:"Incorrect format",
             error:parsedDataWithSuccess.error
        })
    }



    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName=req.body.lastName;

    const hashedPassword =await bcrypt.hash(password,5)

    try{
        await userModel.create({
            email,
            password:hashedPassword,
            firstName,
            lastName
        });

        res.json({
            message: "You are signed up"
        })
    }catch(err){
        console.log(err);
        res.json({
            message:"user already exists"
        })
    }
})

userRouter.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email,
    });

    const passwordMatch =await  bcrypt.compare(password,user.password);



    if (user && passwordMatch ) {
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_USER_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});



// userRouter.post("/signin",function(req,res){
    
// })


userRouter.get("/purchases",userAuth,async function(req,res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
            userId
    })

    res.json({
            purchases
    })
})



module.exports={
    userRouter
}