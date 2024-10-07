import pkg from 'jsonwebtoken'
const {verify}=pkg;
export default async function Auth(req,res,next) {
    try{
        const key = req.headers.authorization;
        console.log(req.headers.authorization);
        if(!key)
         return res.status(403).send({ msg: "Unauthorized acess"});

        const token = key.split(" ")[1];
        console.log(token);
        
        const auth = await verify(token,process.env.JWT_KEY);
        console.log(auth);
        req.user=auth;
        next();
        
    }
    catch{
        return res.status(403).send({ msg: "Session expired" });
    }
}  