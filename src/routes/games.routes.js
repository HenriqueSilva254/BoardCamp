import { Router } from "express";
import { getGames, postGames } from "../controllers/jogos.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/games.schema.js";

const gamesRouters = Router()

gamesRouters.post("/games", validateSchema(gameSchema), postGames)
gamesRouters.get("/games", getGames)

export default gamesRouters