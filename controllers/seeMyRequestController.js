import Organization from "../model/organization.js"

 
const seeMyRequestController = async(req,res) => {
  try{
    const {roomId} = req.body
    console.log(roomId)
    if(!roomId){
        return res.status(404).json({
            err:"missing fields"
        })
    
    }



    const findUser = await Organization.findOne(
        {roomId,
        "members.cin":req.user.cin
        },{
               members: {
                    $elemMatch: { cin: req.user.cin }
                    }
        }
    )

    if(!findUser){
        return res.json({
            err:"room or user not exist 🤦‍♂️"
        })
    }
   

    return res.json({
        info:findUser.members[0].response_conge,
        ok:findUser.members[0].response_conge.length>0?true:false
    })
}catch(error){
    return res.status(400).json({
        err:error.message
    })
  }
}

export default seeMyRequestController