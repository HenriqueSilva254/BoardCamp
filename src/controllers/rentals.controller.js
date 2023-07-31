import { db } from "../database/database.connection.js";

export async function postRental(req, res){
    const {customerId, gameId, daysRented} = req.body

    try { 
        const checkCustomerId = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId])
        const checkGameId = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId])

        if(checkCustomerId.rows.length === 0) return res.sendStatus(400)
        if(checkGameId.rows.length === 0) return res.sendStatus(400)

        const checkStock = await db.query(`SELECT games."stockTotal" FROM games WHERE games.id = $1`, [gameId])
        const stock = checkStock.rows[0].stockTotal
        if(stock <= 0) return res.status(400).send('Jogo sem estoque suficiente')
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
        
        res.sendStatus(200)

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