import express from "express"
import { loginController, registerController } from "../controllers/authbuffer/authBuffer.js"

 
 

const router = express.Router()

router.post("/login/v1",loginController)
router.post("/register/v1",registerController)


export default router