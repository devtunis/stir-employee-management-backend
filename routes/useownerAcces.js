import express from "express"
import useowneraceescontroller from "../controllers/useowneraceescontroller.js"
import useowneraccesCongeController from "../controllers/useowneraccesCongeController.js"


const router = express.Router()

router.post("/v1",useowneraceescontroller)
router.post("/conge/v1",useowneraccesCongeController)
export default router  