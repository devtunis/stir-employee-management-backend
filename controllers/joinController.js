import Organization from "../model/organization.js"

 
const joinController = async(req,res) => {
  try{

          const {repoId} = req.body
       
          console.log(repoId,"<==")
          if(!repoId){
            return res.status(404).json({messag: "missing repoID"})
          }
          const fetchrepoID =  await Organization.findOne({roomId:repoId}).select("ownerId -_id")
        
          if(!fetchrepoID)
          {
            return res.status(404).json({err:"no ogranizations with this ID 🤦‍♂️"})
          }
          if(fetchrepoID.ownerId==req.user.cin) {
           return res.status(403).json({err:"you the owner"})
           }

           const findExistUser = await Organization.findOne({roomId:repoId,"members.cin":req.user.cin})
           const findExistUser2 = await Organization.findOne({roomId:repoId,"requests.cin":req.user.cin})
           if(findExistUser || findExistUser2){
            return res.status(409).json({err:"your rquest has ben sent 🤦‍♂️!"})
           }

          const addWorker = await Organization.findOneAndUpdate(
            {
                roomId:repoId
            },
            {
                $addToSet : {requests:{cin:req.user.cin,nom:req.user.nom}}
                 
            },
            {returnDocument:"after"}
          )

            


          
           res.status(200).json(addWorker)
    }
    catch(err){
        res.status(404).json({message :err.message})
    }
}

export default joinController