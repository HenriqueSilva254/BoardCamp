import { errors } from "../errors/errors.js"
import { customersById } from "../repositories/cliente.repository.js"
import { checkGamesById, checkGamesByRentalId, checkPriceGame} from "../repositories/jogos.repositories.js"
import { allRentals, checkRentalFinished, checkStockGames, customersWithRentals, deleteRentalRepository, finishRentalRepository, gamesWithRentals, increaseStock, insertRental, reduceStock } from "../repositories/rentals.service.js"

export async function createRental(customerId, gameId, daysRented){
    const checkCustomerId = await customersById(customerId)
    const checkGameId = await checkGamesById(gameId)
    const checkStock = await checkStockGames(gameId)
    if(checkCustomerId.rows.length === 0) throw errors.notFound("Cliente")
    if(checkGameId.rows.length === 0) throw errors.notFound("Jogo")
    if(checkStock <= 0) throw errors.insufficientStock()

    const pricePerDay = daysRented * checkGameId.rows[0].pricePerDay
    await reduceStock(gameId)
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

export async function finishRentalService(id){
    const checkGameId = await checkGamesByRentalId(id)
    if(checkGameId.rows.length === 0) throw errors.notFound('Aluguel') 
    const checkRentalFinish = await checkRentalFinished(id)
    if(checkRentalFinish.rows.length > 0 && checkRentalFinish.rows[0].returnDate !== null) throw errors.conflict("Este aluguel já foi finalizado")
    
    const gameId = checkGameId.rows[0].gameId
    const priceGame = await checkPriceGame(gameId)
    await increaseStock(gameId)
    await finishRentalRepository(priceGame, id)
}

export async function deleteRental(id){
    const checkRentalFinish = await checkRentalFinished(id)
    if(checkRentalFinish.rows.length === 0) throw errors.notFound("Este aluguel")
    if(checkRentalFinish.rows[0].returnDate === null)  throw errors.notFineshed()

    await deleteRentalRepository(id)
}
