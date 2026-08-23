import Organization from "../model/organization.js"

 

const setAdminController = async(req,res) => {
     try{

          const {repoId ,cinUser,roleTitle,head} = req.body
       
      
          if(!repoId || !cinUser){
            return res.status(404).json({messag: "missing repoID"})
          }
          const fetchrepoID =  await Organization.findOne({roomId:repoId}).select("ownerId -_id")
        
          if(!fetchrepoID)
          {
            return res.status(404).json({err:"no ogranizations with this ID 🤦‍♂️"})
          }
          if(fetchrepoID.ownerId!=req.user.cin) {
          return res.status(404).json({message: "you not authorized to to this action 🌹"})
           }
           if(cinUser==req.user.cin){
            return res.status(404).json({mesage: "you the owner you can't add your self "})
           }

           const findExistUser = await Organization.findOne({roomId:repoId,"members.cin":cinUser})
           if(!findExistUser){
            return res.status(409).json({err:"user not here 🤦‍♂️!"})
           }

          const addWorker = await Organization.findOneAndUpdate(
            {
                roomId:repoId,
               
                "members.cin": cinUser
            },
            {
                $set : {"members.$.role": roleTitle}
                 
            },
            {returnDocument:"after"}
          )
          if(head){
           const responseUser =  await Organization.findOneAndUpdate({
                    roomId:repoId
                },
                {
                    $set:{head:cinUser}
                },
                {
                    returnDocument:"before"
                }
            )
            console.log(responseUser)
          }

            


          
           res.status(200).json(addWorker)
    }
    catch(err){
        res.status(404).json({message :err.message})
    }
}

export default setAdminController