import Organization from "../model/organization.js"

 
const approveCongeController =async (req,res) => {
    const {roomId,cin,answer,reason,nbjr,nom} = req.body

    
    if(!roomId || !cin || answer==undefined || !reason || !nbjr || !nom  ){
        return res.status(404).json({
            err:"missing fields"
        })
    }

    const findRoom = await Organization.findOne({roomId})
    if(!findRoom){
        return res.status(404).json({
            err:"no orgaization with this id"
        })
    }
 
    
    const checkIfCinExisit = await Organization.findOne(
        {roomId,
            "members.cin":cin
        },
           {
        members: {
         $elemMatch: { cin: cin }
        }
        }
    )

    


    if(!checkIfCinExisit){
        return res.status(404).json({
            err:"this user not here in this organization"
        })
    }
  
        const Permision = checkIfCinExisit.members[0].role
        if(Permision.includes("admin")){
            return res.status(404).json({
                err:"admins special traitemnt"
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

            await Organization.findOneAndUpdate(
                {
                    roomId,
                    "members.request_conge.cin": cin
                },
                {
                    $pull: {
                    "members.$[].request_conge": {
                        cin: cin
                    }
                    }
                },
                {
                    returnDocument:"after"
                }
            )
            await Organization.findOneAndUpdate({
                roomId, 
                "members.cin" :cin
            },
            {
                    $addToSet:{
                        "members.$.response_conge":{reponse:answer?"yes":"no",cin_reponse:req.user.cin,reason:answer?"*":reason}
                    }
                }
            ,{
                returnDocument:"after"
            }
        
            )



         
      
      
    }    
    if(getMynext && getMynext!="nil" && answer){


        const ifThisOderInmyRquests = Organization.findOne({
            roomId,
            "members.request_conge.cin":cin
        })
        if(!ifThisOderInmyRquests){
            return res.status(404).json(
                {
                    err:"this fake request !"
                }
            )
        }

       
          await Organization.findOneAndUpdate(
                {
                    roomId,
                    "members.request_conge.cin": cin
                },
                {
                    $pull: {
                    "members.$[].request_conge": {
                        cin: cin
                    }
                    }
                },
                {
                    returnDocument:"after"
                }
                );
            
          

          await Organization.findOneAndUpdate({
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
  

      
        return res.status(200).json({
            err:"should be send my next thing to" +" " +getMynext ,
            info:{roomId,cin,answer,reason,nbjr,nom}
        })
        
    }
    if(getMynext && getMynext!="nil" && !answer){


              await Organization.findOneAndUpdate(
                {
                    roomId,
                    "members.request_conge.cin": cin
                },
                {
                    $pull: {
                    "members.$[].request_conge": {
                        cin: cin
                    }
                    }
                },
                {
                    returnDocument:"after"
                }
                );
            




          await Organization.findOneAndUpdate({
                roomId, 
                "members.cin" :cin
            },
            {
                    $addToSet:{
                        "members.$.response_conge":{reponse:answer?"yes":"no",cin_reponse:req.user.cin,reason:answer?"*":reason}
                    }
                }
            ,{
                returnDocument:"after"
            }
        
            )


        return res.status(200).json({
            err:"should be refuse  my next thing to" +"user?="+cin
        })
        
    }
    
    res.status(200).json({
               seeMyRoles
            })
  
  
}

export default approveCongeController