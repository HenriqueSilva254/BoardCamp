import { db } from "../database/database.connection.js"

export async function insertGames(name, image, stockTotal, pricePerDay){
    return  await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
    VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay])
}

export async function checkGames(name){
    return await db.query(`SELECT * FROM games WHERE name=$1;`, [name])
}

export async function checkGamesById(id){
    return await db.query(`SELECT * FROM games WHERE id=$1;`, [id])
}

export async function allGames(){
    return await db.query(`SELECT * FROM games;`)
}
