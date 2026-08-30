import Posts from "../model/posts.js"

 

const getnewPosts = async(req,res) => {
  
    const {roomId} = req.body 
    if(!roomId){
        return res.status(404).json({
            err:"missing fields"
        })
    }
    const bringPosts = await Posts.findOne({roomId})
    if(!bringPosts){
          return res.status(404).json({
            err:"no posts"
        })
    }
     return res.status(200).json({
        
            posts:bringPosts.posts_section,
            nameorg:bringPosts.nameOrg
        })

}

export default getnewPosts