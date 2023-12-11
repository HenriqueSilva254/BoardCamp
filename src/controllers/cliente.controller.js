
import { db } from "../database/database.connection.js";
import { chengeCustomersInfo, createCustomers, searchCustomers } from "../service/cliente.service.js";

export async function postCustomers(req, res){
    const {name, phone, cpf, birthday} = req.body

    try {
        await createCustomers(name, phone, cpf, birthday, res)
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomers(req, res){
    const {id} = req.params  

    try {
        const customers = await searchCustomers(id)
        res.status(200).send(customers.rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

export async function putCustomers(req, res){
    const {id} = req.params
    const {name, phone, cpf, birthday} = req.body

    try {
        await chengeCustomersInfo(name, phone, birthday, cpf, id)
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}