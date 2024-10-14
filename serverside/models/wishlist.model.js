import mongoose from "mongoose";
const listSchema = new mongoose.Schema({
    buyerId:{type:String},
    product:{type:Object}
})
export default mongoose.model.Lists||mongoose.model("List",listSchema);