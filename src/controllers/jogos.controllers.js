
import { db } from "../database/database.connection.js";


export async function postGames(req, res) {
  const {name, image, stockTotal, pricePerDay} = req.body

  try {
    const inserirJogos = await db.query('INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES($1, $2, $3, $4);', [name, image, stockTotal, pricePerDay])
    res.send(games.rows);
  } catch (err) {
    res.status(500).send(err);
  }
}

