import express from "express";
import { connection } from "./db.js";

const app = express()
const port = 3001

app.use(express.json());

app.get('/login', (req, res) => {
  const sql = `SELECT * FROM \`users\` WHERE BINARY \`login\` =  ? AND BINARY \`password\` = ?`

  const params = [req.query.login, req.query.password]

  connection.query(sql, params , (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
});

app.get('/check-profile', (req, res) => {
  const sql = `SELECT * FROM \`profile\` WHERE \`user_id\` = ?`

  const params = [req.query.id]

  connection.query(sql, params , (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
});

app.get('/default-data', (req, res) => {
  const sql = `SELECT * FROM \`default_data\` WHERE \`user_id\` = ?`

  const params = [req.query.id]

  connection.query(sql, params , (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
});

app.get('/default-names', (req, res) => {
  const sql = `SELECT * FROM \`names\` WHERE 1`

  connection.query(sql,(error, results) => {
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
