import Organization from "../model/organization.js"

 
const seeCongeController = async (req,res) => {
    const {roomId} = req.body
    if(!roomId){
        return res.status(404).json({message : "missing fields"})
    }
     const fetchrepoID =  await Organization.findOne({roomId:roomId}).select("ownerId -_id")
     if(!fetchrepoID) { return res.status(404).json({err:"no ogranizations with this ID 🤦‍♂️"}) }
   

   if(fetchrepoID.ownerId == req.user.cin){
    return res.status(404).json({
        err:"you the owner  just you can set admins and remove admins"
    })
   }

     const checkIfsednerExist = await Organization.findOne(
        {roomId:roomId,
        "members.cin":req.user.cin

    } , 
    {
        members: {
      $elemMatch: { cin: req.user.cin }
    }
    }
     ) 


     
    if(!checkIfsednerExist) { return res.status(404).json({err:"no user with this ID 🤦‍♂️"}) }
    if(!checkIfsednerExist.members[0].role.includes("admin")){
        return res.status(404).json({err:"you not authorized to to this action 🌹"})
    }
    let getequestes = checkIfsednerExist.members[0].request_conge || []

    res.status(200).json(getequestes)
   
}

export default seeCongeController