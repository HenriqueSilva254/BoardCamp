import { Router } from "express";
import { getCustomers, postCustomers, putCustomers } from "../controllers/cliente.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customers.schema.js";

const customers = Router()

customers.post("/customers", validateSchema(customerSchema), postCustomers)
customers.get("/customers/:id", getCustomers)
customers.get("/customers", getCustomers)
customers.put("/customers/:id", validateSchema(customerSchema), putCustomers)


export default customers