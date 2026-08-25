import express from "express"
import getmydatacontroller from "../controllers/getmydatacontroller.js"
 

const router = express.Router()

router.get("/v1",getmydatacontroller)
 
export default router