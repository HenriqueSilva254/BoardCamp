import { db } from "../database/database.connection.js";

export async function postRental(req, res){
    const {customerId, gameId, daysRented} = req.body
    if(daysRented <= 0) return res.status(400).send("daysRented não pode ser menor ou igual a zero")
    try { 
        const checkCustomerId = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId])
        const checkGameId = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId])

        if(checkCustomerId.rows.length === 0) return res.sendStatus(400)
        if(checkGameId.rows.length === 0) return res.sendStatus(400)

        const checkStock = await db.query(`SELECT games."stockTotal" FROM games WHERE games.id = $1`, [gameId])
        const stock = checkStock.rows[0].stockTotal
        if(stock === 0) return res.status(400).send('Jogo sem estoque suficiente')
        const stockTotal = await db.query(`UPDATE games SET "stockTotal" = "stockTotal" -1 WHERE games.id = $1`, [gameId])
        const postRental = await db.query(`INSERT INTO rentals (          
            "customerId", 
            "gameId", 
            "rentDate",
            "daysRented",
            "returnDate", 
            "originalPrice",  
            "delayFee" )
            VALUES
            ( $1, $2, CURRENT_DATE, $3, null, ${daysRented * checkGameId.rows[0].pricePerDay}, null )`,
            [customerId, gameId, daysRented])
        
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getRental(req, res){
    try {
        const Rental = await db.query(`SELECT * FROM rentals`)
        const Games =  await db.query(`SELECT games.id, games.name FROM games JOIN rentals ON games.id = rentals."gameId"`)
        const Customers =  await db.query(`SELECT customers.id, customers.name FROM customers JOIN rentals ON customers.id = rentals."customerId"`)
        
        const RentalsList = Rental.rows.map((rental, i) => ({
            ...Rental.rows[i],
            customer: Customers.rows[i],
               game: Games.rows[i]
        }))
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
