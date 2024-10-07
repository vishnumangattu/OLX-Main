import userSchema from './models/user.model.js'
import bcrypt from 'bcrypt'
import pkg from "jsonwebtoken";

const {sign}=pkg;

export async function getProducts(req,res) {
    try {
        console.log(req.user.userId);
        const _id = req.user.userId;
        const user = await userSchema.findOne({_id});
        console.log(user);
        if(!user) 
            return res.status(403).send({msg:"Unauthorized access"})
        const employees=await userSchema.find();
        res.status(200).send({employees,username:user.username})
        
    } catch (error) {
        res.status(404).send({msg:error})
    }
}

export async function signUp(req,res) {
    try{
        const {email,username,password,cpassword } = req.body;
        console.log(email,username,password,cpassword);
        if(!(email&& username&& password&& cpassword))
            return res.status(404).send({msg:"fields are empty"})
        if(password !== cpassword)
            return res.status(404).send({msg:"password not matching"})
        bcrypt
        .hash(password,10)
        .then((hashedPassword)=>{
            console.log(hashedPassword);
            userSchema
            .create({email,username,password:hashedPassword})
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
    console.log(req.body);
    const{email,password}=req.body;
    if(!(email&& password))
        return res.status(404).send({msg:"fields are empty"});
    const user=await userSchema.findOne({email});
    console.log(user);
    if(user===null){
        return res.status(404).send({msg:"Invalid username"});
    }
    const success=await bcrypt.compare(password,user.password);
    console.log(success);
    if(success!==true)
        return res.status(404).send({msg:"email or password is invalid"});

    const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
    console.log(token);
    return res.status(200).send({msg:"successfully logged in",token})
}