import { errors } from "../errors/errors.js"
import { customersById } from "../repositories/cliente.repository.js"
import { checkGamesById} from "../repositories/jogos.repositories.js"
import { allRentals, checkStockGames, customersWithRentals, gamesWithRentals, stockUpdate } from "../repositories/rentals.service.js"

export async function createRental(customerId, gameId, daysRented){
    const checkCustomerId = await customersById(customerId)
    const checkGameId = await checkGamesById(gameId)
    const checkStock = await checkStockGames(gameId)
    if(checkCustomerId.rows.length === 0) throw errors.notFound("Cliente")
    if(checkGameId.rows.length === 0) throw errors.notFound("Jogo")
    if(checkStock <= 0) throw errors.insufficientStock()

    const pricePerDay = daysRented * checkGameId.rows[0].pricePerDay
    await stockUpdate(gameId)
    await insertRental(customerId, gameId, daysRented, pricePerDay)
}

export async function Rentals(){
    const Rental = await allRentals()
    const Games =  await gamesWithRentals()
    const Customers =  await customersWithRentals()
    
    return Rental.rows.map((rental, i) => ({
        ...Rental.rows[i],
        customer: Customers.rows[i],
           game: Games.rows[i]
    }))
}
