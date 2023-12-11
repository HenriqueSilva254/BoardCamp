import { db } from "../database/database.connection.js"

export async function insertRental(customerId, gameId, daysRented, pricePerDay){
    return  await db.query(`INSERT INTO rentals ( "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice",  
    "delayFee" ) VALUES ( $1, $2, CURRENT_DATE, $3, null, $4, null )`, [customerId, gameId, daysRented, pricePerDay])
}

export async function checkStockGames(gameId){
    const checkStock = await db.query(`SELECT games."stockTotal" FROM games WHERE games.id = $1`, [gameId])
    return checkStock.rows[0].stockTotal
}

export async function reduceStock(gameId){
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

export async function checkRentalFinished(id){
    return await db.query(`SELECT  rentals."returnDate" FROM rentals WHERE id=$1`, [id])
}
export async function increaseStock(gameId){
    return  await db.query(`UPDATE games SET "stockTotal" = "stockTotal" +1 WHERE games.id = $1`, [gameId])
}

export async function finishRentalRepository(priceGame, id){
    return  await db.query(`UPDATE rentals SET          
    "returnDate" =  CURRENT_DATE, 
    "delayFee" =  CASE 
    WHEN ((EXTRACT(DAY FROM AGE(CURRENT_DATE, "rentDate")) - "daysRented") * ${priceGame}) > 0 
    THEN ((EXTRACT(DAY FROM AGE(CURRENT_DATE, "rentDate")) - "daysRented") * ${priceGame})
    ELSE 0
    END 
    WHERE id = $1`, [id]);
}

export async function deleteRentalRepository(id){
    return  await db.query(`DELETE FROM rentalsWHERE id = $1`, [id])
}