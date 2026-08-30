import Organization from "../model/organization.js"

 
const sendholidayController = async(req,res) => {
  try{
     const {reason,nbjr,roomId ,debut,fin,typeConge} = req.body
      
     if(  !reason ||!nbjr  || !debut |!fin || !typeConge) {return res.status(404).json({err:"missing fields"})}
     
     const fetchrepoID =  await Organization.findOne({roomId:roomId}) 
     
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
         const finsIFyourHavePendingRequest = await Organization.findOne({
            roomId,
            "members.request_conge.cin":req.user.cin
        })

        if(finsIFyourHavePendingRequest){
            return res.status(409).json({
                err:"you have Pending request 🤦‍♂️"
            })
        }
        const heading = await Organization.findOne({roomId}).select("head -_id")
        const first_heading = heading.head
        if(first_heading=="nil"){
            return res.status(404).json({err:"no admin yet 🤦‍♂️"})
        }
        const send_holiday_request = await Organization.findOneAndUpdate({
            roomId,
           "members.cin":first_heading,
           head:first_heading
        },{
            $addToSet:{
                "members.$.request_conge":{cin:req.user.cin,reason,nbjr,roomId,nom:req.user.nom,debut,fin,typeConge}
            }
        }

        ,{
            returnDocument:"after"
        }
    )
        
       await Organization.findOneAndUpdate(
                {
                    roomId,
                    "members.cin": req.user.cin,
                },
                {
                    $set: {
                    "members.$.findMyrequest":fetchrepoID.members.find((item)=>item.cin==first_heading).role,
                   
                    },
                }
                );




    
        res.status(200).json(send_holiday_request)
     }else{
     
        const getNext = finduser?.members[0].next
        console.log(getNext)
         
        if(getNext=="end"){
            const isHavePendingRequtes  = await  Organization.findOneAndUpdate({
                roomId,
                "request_holiday.seen":false
            })
        if(isHavePendingRequtes){
            return res.status(409).json({message:"you have Pending request!"})
        }
          
            
                const SendToOwner = await Organization.findOneAndUpdate(
                { roomId },
                {
                    $push: {
                        request_holiday: {
                            cin: req.user.cin,
                            reason,
                            roomId,
                            nom:req.user.nom,
                            debut,
                            fin,
                            typeConge
                        }
                    }
                },
                {returnDocument:"after"}
            );



         return   res.status(200).json({
                message:"sent you !",
                SendToOwner
            })
        }













        await Organization.findOneAndUpdate({
                    roomId,
                "members.cin":getNext,
                 
                },{
                    $addToSet:{
                        "members.$.request_conge":{cin:req.user.cin,reason,nbjr,roomId,nom:req.user.nom,debut,fin,typeConge}
                    }
                }

                ,{
                    returnDocument:"after"
                }
            )


         res.status(200).json(`sumbit to next:${getNext}`)
     }
   
  }catch(error){
    console.log(error.message)
     
    res.status(404).json({err:error.message})
  }
}

export default sendholidayController