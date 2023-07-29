import { Router } from "express";
import { getGames, postGames } from "../controllers/jogos.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/games.schema.js";

const Gamesrouters = Router()

Gamesrouters.post("/games", validateSchema(gameSchema), postGames)
Gamesrouters.get("/games", getGames)

export default Gamesrouters