import express from "express"
import loginController from "../controllers/loginController.js"
import registerController from "../controllers/registerController.js"
 

const router = express.Router()

router.post("/login/v1",loginController)
router.post("/register/v1",registerController)


export default router