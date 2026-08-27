import express from "express"
import useMoreInfoController from "../controllers/useMoreInfoController.js"
 
const router = express.Router()

router.post("/v1",useMoreInfoController)
 


export default router