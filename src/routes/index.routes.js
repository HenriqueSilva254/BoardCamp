import { Router } from "express";
import Gamesrouters from "./games.routes.js";

const router = Router()

router.use(Gamesrouters);

export default router