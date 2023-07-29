import { Router } from "express";
import { getRental, postRental } from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import rentalSchema from "../schemas/rentals.schema.js";

const rentals = Router()

rentals.post("/rentals", validateSchema(rentalSchema), postRental)
rentals.get("/rentals", getRental)

export default rentals 