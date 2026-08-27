import Organization from "../model/organization.js"

 

const useMoreInfoController =async (req,res) => {

    try{
        const {roomId ,cin} = req.body
        const findsome = await Organization.findOne({roomId})
        if(!findsome){
            return res.status(404).json({
                err:"no org with this id 🤦‍♂️"
            })
        }
        const fetchPersmion = findsome.members.find(item =>item.cin==req.user.cin).role
        if(fetchPersmion.includes("admin")){
            return res.status(200).json({
                info : findsome.members.find(item=>item.cin == cin)
            })
        }
        return res.status(404).json({
          err:"server error"
        })
       
        

    }catch(err){
        return res.status(404).json({
            err:err.message
        })
    }
  
}

export default useMoreInfoController