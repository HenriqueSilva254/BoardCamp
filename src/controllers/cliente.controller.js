
import { db } from "../database/database.connection.js";

export async function postCustomers(req, res){
    const {name, phone, cpf, birthday} = req.body

    try {
        const checkUser = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
        if(checkUser.rows && checkUser.rows.length !== 0) return res.status(409).send("ususário já existe")

        const insertUser = await db.query(`INSERT INTO customers (name, "phone", "cpf", "birthday") 
        VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomers(req, res){
    const {id} = req.params  

    try {
        if(id){
        const checkUserId = await db.query(`SELECT json_build_object('id', id, 'name', name, 'phone', phone, 'cpf', cpf, 'birthday', TO_CHAR(birthday, 'YYYY-MM-DD')) AS customer_object
        FROM customers
        WHERE id = $1;`, [id] )
        if(checkUserId.rows.length === 0) return res.status(404).send(`id de usuário inexistente`)
        const customerObject = checkUserId.rows[0].customer_object;
        return res.status(200).send(customerObject);
        
        } 
        const checkUser = await db.query(`SELECT id, name, phone, cpf, SUBSTRING(birthday::text, 1, 10) AS birthday
        FROM customers;` )
        res.status(200).send(checkUser.rows)
    } catch (err) {
        res.status(500).send(err)
    }
}
export async function putCustomers(req, res){
    const {id} = req.params
    const {name, phone, cpf, birthday} = req.body

    try {
        const checkCpf = await db.query(`SELECT * FROM customers WHERE cpf= $1`, [cpf])
        if(checkCpf.rows[0].id !== Number(id)) return  res.status(409).send('cpf de usuário já cadastrado')
        
        const checkUser = await db.query(`UPDATE customers SET name= $1, phone= $2, birthday= $3 WHERE id= $4`, 
        [name, phone, birthday, id] )
        
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err)
    }
}