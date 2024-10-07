import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    pname:{type:String},
    price:{type:Number},
    category:{type:String},
    discription:{type:String},
    sellerId:{type:String},
    images:{type:Array},
    place:{type:String},
    address:{type:String},
    pincode:{type:Number},
    phone:{type:Number}
})
export default mongoose.model.Products||mongoose.model("Product",productSchema)