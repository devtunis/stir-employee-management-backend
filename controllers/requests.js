import Organization from "../model/organization.js"

 
const requests =  async (req,res) => {
     
    try{
        const {roomId} = req.body
        if(!roomId) {
            return res.status(404).json({message: "missing fileds"})
        }
        const fetchRoom = await Organization.findOne({ roomId  })
        if(!fetchRoom) {
            return res.status(404).json({message: "no organization"})
        }
        if(fetchRoom.ownerId!=req.user.cin){
            return res.status(404).json({message: "you not authorized to to this action 🌹"})
        }
         return res.status(200).json(fetchRoom.requests) 
    }catch(err){
         return res.status(404).json({err})
    }
    
   
}

export default requests