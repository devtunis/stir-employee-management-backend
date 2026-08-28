import jwt from "jsonwebtoken"
 
const verifyJwt = (req,res,next) => {
     const headerToken = req.headers.cookie
     if(!headerToken){
        return res.status(404).json({message:"missing token"})
     }
     const Token = headerToken.split("=")[1] || undefined 
     if(!Token){
       return res.status(404).json({message:"missing token"})
     }

   
     if(Token){
   
             const data =  jwt.verify(Token, process.env.secret_key)
              req.user = data
     }
 
    next()
}

export default verifyJwt
