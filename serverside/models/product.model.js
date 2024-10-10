import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    pname:{type:String},
    price:{type:Number},
    category:{type:String},
    description:{type:String},
    sellerId:{type:String},
    images:{type:Array},
    sellerName:{type:String},
    place:{type:String},
    address:{type:String},
    phone:{type:Number},
    pincode:{type:Number}
})
export default mongoose.model.Products||mongoose.model("Product",productSchema)