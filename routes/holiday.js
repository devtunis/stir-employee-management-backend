import express from "express"
import sendholidayController from "../controllers/sendholidayController.js"
 
const router = express.Router()


router.post("/send/v1",sendholidayController)

export default router