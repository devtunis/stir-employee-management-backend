import Organization from "../model/organization.js"

 
const sendholidayController = async(req,res) => {
  try{
     const {nom,reason_holiday,nbjr,roomId} = req.body
     if(  !nom ||!reason_holiday ||!nbjr   ) {return res.status(404).json({err:"missing fields"})}
     const fetchrepoID =  await Organization.findOne({roomId:roomId}).select("ownerId -_id")
     if(!fetchrepoID) { return res.status(404).json({err:"no ogranizations with this ID 🤦‍♂️"}) }
     if(fetchrepoID.ownerId==req.user.cin) {return res.status(403).json({err:"you the owner you don't need holiday"}) }
     const finduser = await Organization.findOne({
        roomId,
        "members.cin":req.user.cin
     }
    ,{
    members: {
      $elemMatch: { cin: req.user.cin }
    }
  }
    ) 
     if(!finduser){
        return res.status(200).json({
            message: "you dont follow this organization"
        })
     }


 

     if(finduser?.members[0]?.role=="user"){
        const heading = await Organization.findOne({roomId}).select("head -_id")
        const first_heading = heading.head
        const send_holiday_request = await Organization.findOneAndUpdate({
            roomId,
           "members.cin":first_heading,
           head:first_heading
        },{
            $addToSet:{
                "members.$.request_conge":{cin:req.user.cin,reason:reason_holiday,nbjr,roomId}
            }
        }

        ,{
            returnDocument:"after"
        }
    )
        
        res.status(200).json(send_holiday_request)
     }else{
         res.status(200).json("you special case admin we will figure out aobut you")
     }
   
  }catch(error){
    res.status(404).json({err:error.message})
  }
}

export default sendholidayController