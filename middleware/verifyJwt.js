import jwt from "jsonwebtoken"
const verifyJwt = (req,res,next) => {
     const headerToken = req.headers.cookie
     if(!headerToken){
        return res.status(404).json({err:"missing token"})
     }
     const Token = headerToken.split("=")[1] || undefined 

   
     if(Token){
             const data =  jwt.verify(Token, "123")
              req.user = data
     }
 
    next()
}

export default verifyJwt
