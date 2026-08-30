
import Organization from "../model/organization.js"
import Posts from "../model/posts.js"
import {shortId} from "../util/shortId.js"
const createController = async(req,res) => {
     try{
 
           const {nameOrganization,activity} = req.body
           if(!nameOrganization || !activity){
             return res.status(404).json({messag: "missing fileds"})
           }
           const GetKey = shortId()
           const registerOrganization =   new Organization( {
                 roomId:GetKey,
                 ownerId:req.user.cin,
                 nameOrganization,
                 activity
             })
 
          let CreateBlog =      await new Posts({
                   roomId:GetKey,
                   nameOrg:nameOrganization,
                   ownerId:req.user.cin
               })
            await CreateBlog.save()
            await  registerOrganization.save()
            res.status(200).json(registerOrganization)
     }
     catch(err){
         res.status(404).json({message :err.message})
     }
}

export default createController