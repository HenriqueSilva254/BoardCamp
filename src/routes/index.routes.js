import { Router } from "express";
import gamesRouters from "./games.routes.js";
import customers from "./customers.routes.js";
import rentals from "./rentals.routes.js";

const router = Router()

router.use(gamesRouters);
router.use(customers)
router.use(rentals)

export default router 