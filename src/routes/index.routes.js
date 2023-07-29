import { Router } from "express";
import Gamesrouters from "./games.routes.js";
import customers from "./customers.routes.js";
import rentals from "./rentals.routes.js";

const router = Router()

router.use(Gamesrouters);
router.use(customers)
router.use(rentals)

export default router 