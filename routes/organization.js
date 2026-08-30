import express from "express"
import { createController, joinController, requests, setmemberController, setnextController ,getSpecifOrganization ,getAttesationDePresence } from "../controllers/organizationBuffer/organization.js"
 
 

const router = express.Router()

router.post("/create/v1",createController)
router.post("/join/v1",joinController)
router.post("/requests/v1/:roomid", requests) 
router.post("/setmember/v1", setmemberController) 
router.post("/setadmin_next/v1", setnextController) 
router.post("/getSpecOrganization/v1", getSpecifOrganization) 
router.post("/attesationDePresence/v1", getAttesationDePresence) 
 


export default router