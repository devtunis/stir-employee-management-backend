import express from "express"
import getfollowOrg from "../controllers/getfollowOrg.js"


const router = express.Router()

router.get("/v1",getfollowOrg )
 


export default router