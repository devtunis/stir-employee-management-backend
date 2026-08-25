import Organization from "../model/organization.js"
import User from "../model/users.js"

 
const getSpecifOrganization =async (req,res) => {
    const {roomId} = req.body
    const getrepo = await Organization.findOne({
        roomId,
    })
    if(!getrepo){
        return res.status(404).json({
            err:"no organization 🤦‍♂️"
        })
    }

      


    
     
      const filterdata = getrepo.members.find((item)=> item.cin==req.user.cin)
      if(getrepo.ownerId==req.user.cin){
        return  res.status(200).json({
             res:"owner"
        })
      }
      
      // const otherdata = await User.findOne({cin:req.user.cin})

  return  res.status(200).json({
    data:filterdata,
    res:filterdata.role,
    // otherdata

  })
}

export default getSpecifOrganization