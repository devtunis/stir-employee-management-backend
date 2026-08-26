import express from "express"
import {sendholidayController,seeCongeController,approveCongeController ,seeMyRequestController} from "../controllers/holidayBuffer/holidayBuffer.js"
 
 
 
 
const router = express.Router()


router.post("/send/v1",sendholidayController)
router.post("/seeConge/v1",seeCongeController)
router.post("/approveConge/v1",approveCongeController)
router.post("/seeYourHolidayRequest/v1",seeMyRequestController) //pending

export default router
