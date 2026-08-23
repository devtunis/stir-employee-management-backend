import express from "express"
import { createController, joinController, requests, setmemberController, setnextController } from "../controllers/organizationBuffer/organization.js"
 
 

const router = express.Router()

router.post("/create/v1",createController)
router.post("/join/v1",joinController)
router.post("/requests/v1/:roomid", requests) 
router.post("/setmember/v1", setmemberController) 
router.post("/setadmin_next/v1", setnextController) 
 


export default router