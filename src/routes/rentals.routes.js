import { Router } from "express";
import { dellRental, finishRental, getRental, postRental } from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import rentalSchema from "../schemas/rentals.schema.js";

const rentals = Router()

rentals.get("/rentals", getRental)
rentals.post("/rentals", validateSchema(rentalSchema), postRental)
rentals.post("/rentals/:id/return", finishRental)
rentals.delete("/rentals/:id", dellRental)

export default rentals 