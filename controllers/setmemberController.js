import Organization from "../model/organization.js"

 

const setmemberController = async(req,res) => {
  try{

          const {repoId ,cinUser} = req.body
       
      
          if(!repoId || !cinUser){
            return res.status(404).json({messag: "missing repoID"})
          }
          if(cinUser== req.user.cin){
            return res.status(404).json({
              err:"you the owner 🤦‍♂️ "
            })
          }
          const findIfUserINqueeList = await Organization.findOne(
            {roomId:repoId ,
            "requests.cin":cinUser
            }
          
          )
          if(!findIfUserINqueeList){
            return res.status(404).json({
              err:"this user not in the quee list"
            })
          }
          const fetchrepoID =  await Organization.findOne({roomId:repoId}).select("ownerId -_id")
        
          if(!fetchrepoID)
          {
            return res.status(404).json({err:"no ogranizations with this ID 🤦‍♂️"})
          }
          if(fetchrepoID.ownerId!=req.user.cin) {
          return res.status(404).json({message: "you not authorized to to this action 🌹"})
           }

           const findExistUser = await Organization.findOne({roomId:repoId,"members.cin":cinUser})
           if(findExistUser){
            return res.status(409).json({err:"your already here 🤦‍♂️!"})
           }

          const addWorker = await Organization.findOneAndUpdate(
            {
                roomId:repoId
            },
            {
                $addToSet : {members:{cin:cinUser}}
                 
            },
            {returnDocument:"after"}
          )

            


        const result = await Organization.findOneAndUpdate(
          {
            roomId:repoId,
            "requests.cin": cinUser
          },
          {
            $pull: {
              requests: { cin: cinUser }
            }
          },
          {
            returnDocument: "after"
          }
        );


                  


          
           res.status(200).json({w:addWorker,result:result})
    }
    catch(err){
        res.status(404).json({message :err.message})
    }
}

export default setmemberController