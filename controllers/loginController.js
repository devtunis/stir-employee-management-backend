import { generateJWT } from "../middleware/createjwt.js"
import User from "../model/users.js"

 
const loginController = async(req,res) => {
    const {cin,password} = req.body
    if(!cin || !password) {
        return res.status(404).json({err: "mising fields"})
    }
    try{
        const fetchUser = await User.findOne({cin,password}).select("-password -_id")
    
         
        if(fetchUser){
            const {cin,prenom,nom} = fetchUser
            const CreateJWT = generateJWT({cin,prenom,nom})
             res.cookie("token",CreateJWT, {
                httpOnly:true,
                secure:false,
                maxAge:30 * 24 * 60 * 60 * 1000
             }).status(200).json({
                messag: "OK",
                data:fetchUser
             })
            
        }else{
            return  res.status(404).json({message : "we dont found you"})
        }

    }catch(err){
        return res.status(404).json({err:err.message})
    }
  
}

export default loginController