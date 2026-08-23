import express from "express"
import sendholidayController from "../controllers/sendholidayController.js"
 
import seeCongeController from "../controllers/acceptCongeController.js"
import approveCongeController from "../controllers/approveCongeController.js"
 
const router = express.Router()


router.post("/send/v1",sendholidayController)
router.post("/seeConge/v1",seeCongeController)
router.post("/approveConge/v1",approveCongeController)
export default router