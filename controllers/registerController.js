import User from "../model/users.js"
 
const registerController = async(req,res) => {
  const {cin,nom,prenom,password} =  req.body
     
      if(!cin || !nom || !prenom || !password){
          return res.status(404).json({err : "missing fields"})
      }
      try{
       
          const testIfuserExist = await User.findOne({cin})
          if(testIfuserExist){
              return res.status(409).json({err:"user exist"})
          }
          const SaveUser = await new User({cin,nom,prenom,password})
          await SaveUser.save()
          if(SaveUser){
              return res.status(200).json({message : "user created sucess"})
          }
  
      }catch(err){
         return  res.status(404).json({message: err.message})
      }
}

export default registerController