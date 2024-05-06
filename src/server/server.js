import express from "express";
import { connection } from "./db.js";

const app = express()
const port = 3001

app.use(express.json());

app.get('/login', (req, res) => {
  const sql = `SELECT * FROM \`users\` WHERE \`login\` = '${req.query.login}' AND \`password\` = '${req.query.password}'`

  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Запущен на ${port} порту`);
})
