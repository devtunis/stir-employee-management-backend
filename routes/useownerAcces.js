import express from "express"
import useowneraceescontroller from "../controllers/useowneraceescontroller.js"


const router = express.Router()

router.post("/v1",useowneraceescontroller)

export default router  