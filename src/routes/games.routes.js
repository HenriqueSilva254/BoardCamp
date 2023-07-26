import { Router } from "express";
import { postGames } from "../controllers/jogos.controllers.js";

const Gamesrouters = Router()

Gamesrouters.post("/newGames", postGames)


export default Gamesrouters