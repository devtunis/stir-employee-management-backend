
import Organization from "../model/organization.js"
const useowneraccesCongeController = async(req,res)   => {

   try{
    const {roomId} = req.body
    if(!roomId){
        return res.status(404).json({message:"missing fields"})
    }

    const getRoom = await Organization.findOne({roomId})
    if(!getRoom){
        return res.status(404).json({message:"this organization not exisit 🤦‍♂️"})
    }
    if(getRoom.ownerId!=req.user.cin){
        return res.status(404).json({message:"you not authorized to do this action"})
    }
    const reqs = getRoom.request_holiday  || []
 return res.status(200).json(reqs)
   }catch(err){
    return res.status(404).json({err:err.message})
   }
  
}

export default useowneraccesCongeController