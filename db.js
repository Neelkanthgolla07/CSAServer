const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});


const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});


const courseSchema = new Schema({
  title:String,
  description:String,
  price:Number,
  imageUrl: String, // we are storing the image url whcih are plain
  creatorId: ObjectId
});


const purchaseSchema = new Schema({
  courseId: { type: Types.ObjectId, required: true },
  userId: { type: Types.ObjectId, required: true },
});


const userModel = model("user", userSchema);
const adminModel = model("admin", adminSchema);
const courseModel = model("course", courseSchema);
const purchaseModel = model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};
