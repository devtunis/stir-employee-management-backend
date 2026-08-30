import Organization from "../model/organization.js"
import User from "../model/users.js"
const getAttesationDePresence = async(req,res) => {
  const {roomId}  = req.body 
  if(!roomId){
    return res.status(404).json({
        err:"missing fields"
    })
  }
  
  const findRoom  =  await Organization.findOne({
    roomId,
   
}).select("members nameOrganization  ownerId -_id")
 
  if(!findRoom){
    return res.status(404).json({
        err:"no organization with this id 🤦‍♂️"
    })

  }

  const filterUsers  = findRoom.ownerId==req.user.cin
  if(filterUsers){
    return res.status(200).json({
        message :"welcome owner"
    })
  }
  const filtertUsers2 = findRoom.members.filter((item)=>item.cin==req.user.cin)
  if(!filtertUsers2){
    return res.status(404).json({
        message :"no user in this organization 🤦‍♂️"
    })
  }
  
  const searchInfo = await User.findOne({cin:filtertUsers2[0].cin}).select("nom prenom -_id")
   
 
 
  return res.status(200).json({
    cin:filtertUsers2[0].cin,
    role:filtertUsers2[0].role,
    nameOrg:findRoom.nameOrganization,
    nom : searchInfo.nom,
    prenom:searchInfo.prenom


  })

  
}

export default getAttesationDePresence