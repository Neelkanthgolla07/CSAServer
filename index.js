const express= require("express");

const cors=require("cors");



const {Router}=express

const mongoose = require("mongoose"); 

const dotenv = require("dotenv");
dotenv.config()


const app=express();

app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://csa-client-zeta.vercel.app'
    ],
    credentials: true,
}));

const {userRouter}= require ("./routes/user.js")
const {courseRouter}= require ("./routes/course.js")
const {adminRouter}= require ("./routes/admin.js")



app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);



async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB")
    const port= process.env.PORT;
    app.listen(port,()=>{
        console.log("this server is running on",port)
    })
}
main()
// const {createAndCheckUser} =require("./routes/user")

// const {checkCourses} = require("./routes/course")


// app.post("/user/purchaseCourse",function(req,res){
    
// })

// app.get("/user/courses",function(req,res){
    
// })

