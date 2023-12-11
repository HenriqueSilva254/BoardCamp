import { db } from "../database/database.connection.js";
import { Rentals } from "../service/rentals.service.js";

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
        const checkGameId = await db.query(`SELECT rentals."gameId" FROM rentals WHERE id=$1`, [id])
        if(checkGameId.rows.length === 0) return res.status(404).send('Aluguel não existe') 
        const checkRentalFinish = await db.query(`SELECT  rentals."returnDate" FROM rentals WHERE id=$1`, [id])
        if(checkRentalFinish.rows.length > 0 && checkRentalFinish.rows[0].returnDate !== null) return res.status(400).send("Este aluguel já foi finalizado")
        

        const checkPriceGame = await db.query(`SELECT games."pricePerDay" FROM games WHERE id= $1`, [checkGameId.rows[0].gameId])
        const priceGame = checkPriceGame.rows[0].pricePerDay
        const stockTotal = await db.query(`UPDATE games SET "stockTotal" = "stockTotal" + 1 WHERE games.id = $1`, [checkGameId.rows[0].gameId])
        const postRental =  await db.query(`UPDATE rentals SET          
        "returnDate" =  CURRENT_DATE, 
        "delayFee" =  CASE 
        WHEN ((EXTRACT(DAY FROM AGE(CURRENT_DATE, "rentDate")) - "daysRented") * ${priceGame}) > 0 
        THEN ((EXTRACT(DAY FROM AGE(CURRENT_DATE, "rentDate")) - "daysRented") * ${priceGame})
        ELSE 0
        END 
        WHERE id = $1`, [id]);

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
