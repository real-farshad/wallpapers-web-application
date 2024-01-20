import express from "express"
import { getHelloMessage } from "../controllers/helloController"

const router = express.Router()

router.get("/hello", getHelloMessage)

export default router
