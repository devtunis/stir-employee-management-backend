import Organization from "../model/organization.js"
import { daysBetween } from "../util/daysBetween.js"

 
const approveCongeController =async (req,res) => {
    const {
        roomId,
        cin,
        answer,
        reason,
        nbjr,
        nom ,
        debut,
        fin,
        typeConge,
       reasonrefu
      } = req.body

    
    
    if(!roomId || !cin || answer==undefined || !reason  || !nom  ){
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
         
         
        // for protect fake requests
    
        if(!seeMyRoles.members[0].request_conge.find((item)=>item.cin==cin))
        {
            return res.status(404).json({
                err:"this request not in quee list 🤦‍♂️"
            })
        }
   
         
          
            let result_pull =      await Organization.findOneAndUpdate(
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

            let getNbjr = daysBetween(debut,fin)
            let CinConge = result_pull.members.find((item)=>item.cin==cin).conge 
                

            await Organization.findOneAndUpdate({
                roomId, 
                "members.cin" :cin
            },
            {
                    $addToSet:{
                        "members.$.response_conge":{
                            reponse:answer?"yes":"no",
                            cin_reponse:req.user.cin,
                            reason:answer?reason:reasonrefu,
                            debut:debut  ,
                            fin:fin  ,
                            typeConge:typeConge
                        }
                    }
                }
            ,{
                returnDocument:"after"
            }
        
            )


                    await Organization.findOneAndUpdate(
                {
                    roomId,
                    "members.cin": cin,
                },
                {
                    $set: {
                    "members.$.findMyrequest":"no request Pending",
                    "members.$.conge":CinConge -  getNbjr
                    },
                }
                );





     return res.status(200).json({
            info:"should be send my next thing to" +" " +getMynext ,
            info:{roomId,cin,answer,reason,nbjr,nom} ,
             
            res:result_pull.members.find((item)=>item.cin==req.user.cin).request_conge  

        })
         
      
      
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

       
      let result_pull =     await Organization.findOneAndUpdate(
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
                        "members.$.request_conge":{cin:cin,reason:reason,nbjr,roomId,nom:nom,debut,fin,typeConge}
                    }
                }
        
                ,{
                    returnDocument:"after"
                }
            )
  
            console.log(result_pull,"custom preview")

            console.log("this should be working as user")


                    await Organization.findOneAndUpdate(
                {
                    roomId,
                    "members.cin": cin,
                },
                {
                    $set: {
                    "members.$.findMyrequest":result_pull.members.find((item)=>item.cin==getMynext).role   ,
                    },
                }
                );

      
        return res.status(200).json({
            info:"should be send my next thing to" +" " +getMynext ,
            info:{roomId,cin,answer,reason,nbjr,nom} ,
            pullview:result_pull,
            res:result_pull.members.find((item)=>item.cin==req.user.cin).request_conge  

        })
        
    }
    if(getMynext && getMynext!="nil" && !answer){


          let result_pull =       await Organization.findOneAndUpdate(
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
                        "members.$.response_conge":{
                             reponse:"no"
                            ,cin_reponse:req.user.cin,
                            reason:reasonrefu,
                            debut:debut,
                            fin:fin,
                            reason:reasonrefu,
                            typeConge:typeConge
                            
                        }
                    }
                }
            ,{
                returnDocument:"after"
            }
        
            )


                 await Organization.findOneAndUpdate(
                {
                    roomId,
                    "members.cin": cin,
                },
                {
                    $set: {
                    "members.$.findMyrequest": "no request Pending",
                    },
                }
                );





         return res.status(200).json({
            info:"should be send my next thing to" +" " +cin ,
            info:{roomId,cin,answer,reason,nbjr,nom} ,
            pullview:result_pull,
            res:result_pull.members.find((item)=>item.cin==req.user.cin).request_conge  

        })
        
    }
    
    res.status(200).json({
               seeMyRoles
            })
  
  
}

export default approveCongeController