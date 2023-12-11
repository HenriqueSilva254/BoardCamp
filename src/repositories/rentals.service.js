import { db } from "../database/database.connection.js"

export async function insertRental(customerId, gameId, daysRented, pricePerDay){
    return  await db.query(`INSERT INTO rentals ( "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice",  
    "delayFee" ) VALUES ( $1, $2, CURRENT_DATE, $3, null, $4, null )`, [customerId, gameId, daysRented, pricePerDay])
}

export async function checkStockGames(gameId){
    const checkStock = await db.query(`SELECT games."stockTotal" FROM games WHERE games.id = $1`, [gameId])
    return checkStock.rows[0].stockTotal

}

export async function stockUpdate(gameId){
    return  await db.query(`UPDATE games SET "stockTotal" = "stockTotal" -1 WHERE games.id = $1`, [gameId])
}

export async function allRentals(){
    return await db.query(`SELECT * FROM rentals`)
}

export async function gamesWithRentals(){
    return await db.query(`SELECT games.id, games.name FROM games JOIN rentals ON games.id = rentals."gameId"`)
}

export async function customersWithRentals(){
    return await db.query(`SELECT customers.id, customers.name FROM customers JOIN rentals ON customers.id = rentals."customerId"`)
}