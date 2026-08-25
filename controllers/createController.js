
import Organization from "../model/organization.js"
import {shortId} from "../util/shortId.js"
const createController = async(req,res) => {
     try{
 
           const {nameOrganization,activity} = req.body
           if(!nameOrganization || !activity){
             return res.status(404).json({messag: "missing fileds"})
           }
           const registerOrganization =   new Organization( {
                 roomId:shortId(),
                 ownerId:req.user.cin,
                 nameOrganization,
                 activity
             })
 
 
            await  registerOrganization.save()
            res.status(200).json(registerOrganization)
     }
     catch(err){
         res.status(404).json({message :err.message})
     }
}

export default createController