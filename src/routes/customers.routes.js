import { Router } from "express";
import { getCustomers, postCustomers } from "../controllers/cliente.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customers.schema.js";

const customers = Router()

customers.post("/customers", validateSchema(customerSchema), postCustomers)
customers.get("/customers", getCustomers)

export default customers