import { errors } from "../errors/errors.js"
import { allGames, checkGames, insertGames } from "../repositories/jogos.repositories.js"

export async function createGames(name, image, stockTotal, pricePerDay){
    const check = await checkGames(name)
    if (check.rows && check.rows.length !== 0) throw errors.conflict("Este jogo")

    await insertGames(name, image, stockTotal, pricePerDay)
}

export async function searchGames(){
   return await allGames()
}
