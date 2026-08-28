

import Organization from "../model/organization.js"



const useowneraceescontroller =async (req,res) => {
    const {roomId} = req.body 
    if(!roomId){
        return res.status(404).json({
            err:"missing fields"
        })
    }
    const findRoom = await Organization.findOne({
        roomId
    }) .select("ownerId head members.cin    members.role members.next -_id") 

    if(!findRoom){
        return res.status(404).json({
            err:"no room in this id 🤦‍♂️"
        })
    }
    if(req.user.cin!=findRoom.ownerId){
         return res.status(404).json({err:
            "you not authorized to do this action 🌹"
         })
    }

  return  res.status(200).json({
    members:findRoom,
    adminlist : findRoom.members.filter(item => item.role.includes("admin"))
     .map((item)=> ({
        cin:item.cin,
        role:item.role,
        next:item.next,
        isHead:item.cin ==findRoom.head

    }))
    
   
     
  })
}


export default useowneraceescontroller


//  .map((item)=> ({
//         cin:item.cin,
//         role:item.role,
//         next:item.next,
//         ishead:item.next ==findRoom.head

//     }))
    