import Organization from "../model/organization.js"

 

const setnextController = async(req,res) => {
   




         try{
    
              const {repoId ,cinUser,roleTitle,head,next} = req.body
           
          
              if(!repoId || !cinUser){
                return res.status(404).json({messag: "missing fileds"})
              }
              const fetchrepoID =  await Organization.findOne({roomId:repoId}).select("ownerId -_id")
            
              if(!fetchrepoID)
              {
                return res.status(404).json({err:"no ogranizations with this ID 🤦‍♂️"})
              }
              if(fetchrepoID.ownerId!=req.user.cin) {
              return res.status(404).json({message: "you not authorized to to this action 🌹"})
               }
               if(cinUser==req.user.cin){
                return res.status(404).json({mesage: "you the owner you can't add your self "})
               }
    
               const findExistUser = await Organization.findOne({roomId:repoId,"members.cin":cinUser})
               if(!findExistUser){
                return res.status(409).json({err:"user not here 🤦‍♂️!"})
               }
               if(cinUser==next){
                return res.status(404).json({err:"you can't follow  your self 🤦‍♂️"})
               }
    
              const setWorker = await Organization.findOneAndUpdate(
                {
                    roomId:repoId,
                   
                    "members.cin": cinUser
                },
                {
                    $set : {"members.$.role": roleTitle ,"members.$.next":next}
                     
                },
                {returnDocument:"after"}
              )

             
              if(head){
              await Organization.findOneAndUpdate({
                        roomId:repoId
                    },
                    {
                        $set:{head:cinUser}
                    },
                    {
                        returnDocument:"before"
                    }
                )
                
              }
    
                
             const RenderMembers = await Organization.findOne({
                roomId:repoId
             })
     
              
               res.status(200).json({
                
                res :setWorker ,
                filteradmin : setWorker.members.filter((item)=>item.role.includes("admin")),
                LeaksMembers :RenderMembers.members.filter((item)=>item.role.includes("admin")).map((item)=> ({
                                cin:item.cin,
                                role:item.role,
                                next:item.next,
                                isHead:item.cin ==RenderMembers.head

                            }))
    
               })
        }
        catch(err){
            res.status(404).json({message :err.message})
        }
}

export default setnextController