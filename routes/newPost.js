import express from "express"
import newpost from "../controllers/newpost.js"
import getnewPosts from "../controllers/getnewPosts.js"
    
 
 
const router = express.Router()


router.post("/post/v1",newpost)
router.post("/getposts/v1",getnewPosts)
export default router
