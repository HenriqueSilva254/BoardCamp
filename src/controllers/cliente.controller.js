
import { db } from "../database/database.connection.js";

export async function postCustomers(req, res){
    const {name, phone, cpf, birthday} = req.body

    try {
        const checkUser = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
        if(checkUser.rows && checkUser.rows.length !== 0) return res.status(409).send("ususário já existe")

        const insertUser = await db.query(`INSERT INTO customers (name, "phone", "cpf", "birthday") 
        VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomers(req, res){
    // const {name, phone, cpf, birthday} = req.body

    try {
        const checkUser = await db.query(`SELECT * FROM customers` )
        res.send(checkUser.rows)
    } catch (err) {
        res.status(500).send(err)
    }
}