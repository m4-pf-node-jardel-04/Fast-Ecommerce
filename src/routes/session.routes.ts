import { Router } from "express"
import createSessionController from "../controllers/session/createSession.controller"


const sessionRoutes = Router()

sessionRoutes.post('', createSessionController)


export default sessionRoutes