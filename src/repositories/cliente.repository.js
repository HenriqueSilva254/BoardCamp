import { db } from "../database/database.connection.js"

export async function insertCustomers(name, phone, cpf, birthday){
    return  await db.query(`INSERT INTO customers (name, "phone", "cpf", "birthday") 
        VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
}

export async function checkCustomers(cpf){
    return  await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
}
   

export async function customersById(id){
    return  await db.query(`SELECT json_build_object('id', id, 'name', name, 'phone', phone, 'cpf', cpf, 'birthday', TO_CHAR(birthday, 'YYYY-MM-DD')) AS customer_object
    FROM customers
    WHERE id = $1;`, [id] )
}

export async function allCustomers(){
    return await db.query(`SELECT id, name, phone, cpf, SUBSTRING(birthday::text, 1, 10) AS birthday
    FROM customers;` )
}

export async function updateCustomers(name, phone, birthday, cpf, id){
    return await  db.query(`UPDATE customers SET name= $1, phone= $2, birthday= $3, cpf =$4 WHERE id= $5`, 
    [name, phone, birthday, cpf, id] )
}