import Organization from "../model/organization.js";
import Posts from "../model/posts.js";

const newpost = async (req, res) => {
  const {
    roomId,
    nameOrg,
    posts_section
  } = req.body;

    const {
    category,
    categoryClass,
    pinned,
    score,
    title,
    description,
    author,
    time,
    image
  } = posts_section[0];

   
  if (
    category == null ||
    categoryClass == null ||
    pinned == null ||
    score == null ||
    title == null ||
    description == null ||
    author == null ||
    time == null ||
    image == null
  ) {
    return res.status(400).json({
      err: "missing fields posts"
    });
  }

  
  if (!roomId || !nameOrg || !posts_section) {
    return res.status(400).json({
      err: "missing fields"
    });
  }

  const findOrg = await Posts.findOne({
   roomId
  }) 
  if(!findOrg){
   return res.status(404).json({
      err:"this org not exist 🤦‍♂️"
   })
  }
  const Permision = await Organization.findOne({
   roomId
  }).select("ownerId members.role members.cin -_id")

   


   if(Permision.ownerId === req.user.cin ){
      
    const uploadPost = await   Posts.findOneAndUpdate({
    
     roomId

    }
   ,{
      $push :{
         posts_section:{
         category,
         categoryClass,
         pinned,
         score,
         title,
         description,
         author,
         time,
         image
         }
       
      }
   }
   )
   

       return res.status(200).json({
            uploadPost
         });
   }
 
   else{
      return res.status(404).json({
         err:"you not authorized  to do thi action 🌹"
      })
   }
 
 


  
};

export default newpost;
