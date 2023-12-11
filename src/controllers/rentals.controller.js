import { db } from "../database/database.connection.js";
import { Rentals, createRental, finishRentalService } from "../service/rentals.service.js";

export async function postRental(req, res){
    const {customerId, gameId, daysRented} = req.body
    try { 
        await createRental(customerId, gameId, daysRented)
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getRental(req, res){
    try {
        const RentalsList = await Rentals()
        res.status(200).send(RentalsList)
    } catch (err) {
          res.status(500).send(err.message)
    }
} 

export async function finishRental(req, res){
    const {id} = req.params
   

    try { 
        await finishRentalService(id)
        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function dellRental(req, res){
    const {id} = req.params

    try {
        const checkRentalFinish = await db.query(`SELECT  rentals."returnDate" FROM rentals WHERE id=$1`, [id])
        if(checkRentalFinish.rows.length === 0) return res.status(404).send("Este aluguel não existe")
        if(checkRentalFinish.rows[0].returnDate === null) return res.status(400).send("Este aluguel não foi finalizado")
        
        const Customers =  await db.query(`DELETE FROM rentals
        WHERE id = $1`, [id])
        res.status(200).send('Aluguel deletado')
        
    } catch (err) {
          res.status(500).send(err.message)
    }
} 
