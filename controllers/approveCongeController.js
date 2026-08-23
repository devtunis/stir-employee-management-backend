import Organization from "../model/organization.js"

 
const approveCongeController =async (req,res) => {
    const {roomId,cin,answer,reason,nbjr,nom} = req.body
    if(!roomId || !cin || answer==undefined || !reason || !nbjr || !nom  ){
        return res.status(404).json({
            err:"missing fields"
        })
    }
    
    const checkIfCinExisit = await Organization.findOne(
        {roomId,
            "members.cin":cin
        }
    )
    if(!checkIfCinExisit){
        return res.status(404).json({
            err:"this user not here in this organization"
        })
    }
  
        const seeMyRoles =   await Organization.findOne({
            roomId,
            "members.cin":req.user.cin ,
        },
        {
        members: {
         $elemMatch: { cin: req.user.cin }
        }
        }
    
    )
    if(!seeMyRoles){
        return res.status(404).json({err:"mabe you admin or other user you not authorized to do this request 🤦‍♂️"})
    }
    const getMyrole = seeMyRoles.members[0].role 
    const getMynext = seeMyRoles.members[0].next 
 
    if(!getMyrole.includes("admin")){
        return res.status(404).json({
            err:"you not authorized to do this action"
        })
    }
    if(getMynext=="end"){
        if(answer){
     return res.status(301).json({
            err:"should return approve imedilty to the user"
        })
        }else{
  return res.status(301).json({
            err:"should return refuse imedilty to the user"
        })
        }
      
    }    
    if(getMynext && getMynext!="nil" && answer){





          const send_to_next = await Organization.findOneAndUpdate({
                    roomId,
                   "members.cin":getMynext,
                    
                },{
                    $addToSet:{
                        "members.$.request_conge":{cin:cin,reason:reason,nbjr,roomId,nom:nom}
                    }
                }
        
                ,{
                    returnDocument:"after"
                }
            )

            if(send_to_next){
                console.log("sucess sned to user")
            }

      
        return res.status(200).json({
            err:"should be send my next thing to" +" " +getMynext ,
            info:{roomId,cin,answer,reason,nbjr,nom}
        })
        
    }
    if(getMynext && getMynext!="nil" && !answer){
        return res.status(200).json({
            err:"should be refuse  my next thing to" +"user?="+cin
        })
        
    }
    
    res.status(200).json({
               seeMyRoles
            })
  
  
}

export default approveCongeController