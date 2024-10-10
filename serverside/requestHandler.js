import userSchema from './models/user.model.js';
import productSchema from "./models/product.model.js";
import bcrypt from 'bcrypt';
import pkg from "jsonwebtoken";

const {sign}=pkg;

export async function getProducts(req,res) {
    try {
        const products=await productSchema.find();
        if (req.user!==null) {

            const _id = req.user.userId;
            console.log(_id);
            const user = await userSchema.findOne({_id});
            return res.status(200).send({products,profile:user.profile,id:_id})
        }else{

            console.log("hai");
            return res.status(403).send({products,msg:"Login for better user experience"})
        }
        
        
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}

export async function getUser(req,res) {
    try {
        const {id}=req.params;
        const data=await userSchema.findOne({_id:id});
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function signUp(req,res) {
    try{

        const {email,username,password,cpassword,place,profile,address,phone,pincode} = req.body;
        if(!(email&& username&& password&& cpassword))
            return res.status(404).send({msg:"fields are empty"})
        if(password !== cpassword)
            return res.status(404).send({msg:"password not matching"})
        bcrypt
        .hash(password,10)
        .then((hashedPassword)=>{
            userSchema
            .create({email,username,password:hashedPassword,place,profile,address,phone,pincode})
            .then(()=>{
                console.log("success");
                return res.status(201).send({msg:"successs"})
            })
            .catch((error)=>{
                console.log("faliure");
                return res.status(404).send({msg:"not registered"})
            })
        })
    }
     catch(error){
        return res.status(404).send({msg:error})

    }  
}

export async function signIn(req,res) {
    const{email,password}=req.body;
    if(!(email&& password))
        return res.status(404).send({msg:"fields are empty"});
    const user=await userSchema.findOne({email});
    if(user===null){
        return res.status(404).send({msg:"Invalid username"});
    }
    const success=await bcrypt.compare(password,user.password);
    if(success!==true)
        return res.status(404).send({msg:"email or password is invalid"});

    const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
    return res.status(200).send({msg:"successfully logged in",token})
}

export async function editUser(req,res) {
    try {
        const {_id}=req.params;
    const {...user}=req.body;
    const data=await userSchema.updateOne({_id},{$set:{...user}});
    res.status(201).send(data);
    } catch (error) {
        res.status(404).send(error);
    }
    
}

export async function addProduct(req,res) {
    try {
        const {pname,price,category,description,sellerId,images,place,address,phone,pincode,sellerName} = req.body;
        if(!(pname&&price&&category&&description&&sellerId&&images&&place&&address&&phone&&pincode&&sellerName))
            return res.status(404).send({msg:"fields are empty"})
        console.log("hai");
        
        productSchema
            .create({pname,price,category,description,sellerId,images,place,address,phone,pincode,sellerName})
            .then(()=>{
                console.log("success");
                return res.status(201).send({msg:"successs"})
            })
            .catch((error)=>{
                console.log("faliure");
                return res.status(404).send({msg:"product not added"})
            })
    } catch (error) {
        res.status(404).send(error);
    }
}

export async function getSProducts(req,res) {
    try {
        const {id}=req.params;
        const products=await productSchema.find({sellerId:id});
        res.status(200).send(products);
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function getProduct(req,res) {
    try {
        const {_id}=req.params;
        const product=await productSchema.findOne({_id});
        console.log(product.category);
        res.status(200).send(product);
    } catch (error) {
        res.status(404).send(error)
    }
}