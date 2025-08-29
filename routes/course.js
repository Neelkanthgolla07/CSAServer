

const express= require("express");

const {Router}=express

const courseRouter =Router();

const {courseModel,purchaseModel} = require("../db")

const {userAuth} = require("../middleware/userMw");


courseRouter.post("/purchase",userAuth,async function(req,res){
    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        // Check if user has already purchased this course
        const existingPurchase = await purchaseModel.findOne({
            userId,
            courseId
        });

        if (existingPurchase) {
            return res.status(400).json({
                message: "You have already purchased this course"
            });
        }

        // Create new purchase
        await purchaseModel.create({
            userId,
            courseId
        });

        res.json({
            message: "You have successfully bought the course",
            courseId
        });
    } catch (error) {
        console.error('Error during purchase:', error);
        res.status(500).json({
            message: "Error processing purchase"
        });
    }
})

courseRouter.get("/preview",async function(req,res){
    const courses = await courseModel.find({});

    res.json({
        courses
    })
})
    
    





module.exports={
    courseRouter
}