import express from "express"
import { saveResult } from "../controllers/gameControllers.js"

const gameRouter = express.Router();

gameRouter.post("/save-result", saveResult)

export default gameRouter;