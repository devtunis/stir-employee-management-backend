import express from "express"
import {sendholidayController,seeCongeController,approveCongeController} from "../controllers/holidayBuffer/holidayBuffer.js"
 
 
 
 
const router = express.Router()


router.post("/send/v1",sendholidayController)
router.post("/seeConge/v1",seeCongeController)
router.post("/approveConge/v1",approveCongeController)
export default router