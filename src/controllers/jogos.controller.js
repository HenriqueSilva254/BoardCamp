
import { db } from "../database/database.connection.js";
import { createGames, searchGames } from "../service/jogos.service.js";


export async function postGames(req, res) {
  const {name, image, stockTotal, pricePerDay} = req.body

  try {
    await createGames(name, image, stockTotal, pricePerDay)    
    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getGames(req, res) {

  try {
    const listaGames = await searchGames()
    res.send(listaGames.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
