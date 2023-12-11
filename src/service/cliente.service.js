import { errors } from "../errors/errors.js"
import { allCustomers, checkCustomers, customersById, insertCustomers, updateCustomers } from "../repositories/cliente.repository.js"

export async function createCustomers(name, phone, cpf, birthday){
    const check = await checkCustomers(cpf)
    if(check.rows && check.rows.length !== 0) throw errors.conflict("ususário")

    await insertCustomers(name, phone, cpf, birthday)
}

export async function searchCustomers(id){
    if(id){
    return await customersById(id)
    }
    return await allCustomers(id)
}

export async function chengeCustomersInfo(name, phone, birthday, cpf, id){
    const check = await checkCustomers(cpf)
    if(check.rows.length > 0 && check.rows[0].id !== Number(id)) throw errors.conflict("este cpf")

    return await updateCustomers(name, phone, birthday, cpf, id)
}

