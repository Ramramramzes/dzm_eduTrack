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

app.post('/send-profile', (req, res) => {
  const sql = `
  INSERT INTO \`profile\`(
    \`user_id\`, 
    \`org_id\`, 
    \`name\`, 
    \`short_name\`, 
    \`fio_ruk\`, 
    \`fio_inform\`, 
    \`contact_inform_mail\`, 
    \`contact_inform_tel\`, 
    \`website\`, 
    \`smp_count\`, 
    \`mmp_count\`, 
    \`role\`) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  const params = [req.body.user_id, req.body.org_id, req.body.name, req.body.short_name, req.body.fio_ruk, req.body.fio_inform, req.body.contact_inform_mail, req.body.contact_inform_tel, req.body.website, req.body.smp_count, req.body.mmp_count, req.body.role]
  
  connection.query(sql,params,(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
});

app.post('/send-adress', (req, res) => {
  const sql = `
  INSERT INTO \`adresses\`(\`profile_id\`,\`adress\`)
  VALUES (?, ?)
  `
  const params = [req.body.profile_id, req.body.adress]
  
  connection.query(sql,params,(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
});

app.get('/get-hours', (req, res) => {
  const sql = `SELECT * FROM \`hours\` WHERE 1`

  connection.query(sql,(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
})

app.get('/get-main-spec', (req, res) => {
  const sql = `SELECT * FROM \`main_spec\` WHERE 1`

  connection.query(sql,(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
})

app.get('/get-dop-spec', (req, res) => {
  const sql = `SELECT * FROM \`dop_spec\` WHERE 1`

  connection.query(sql,(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
})

app.get('/get-programm-type', (req, res) => {
  const sql = `SELECT * FROM \`programm_type\` WHERE 1`

  connection.query(sql,(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
})

app.get('/get-programm-adress', (req, res) => {
  const sql = `SELECT * FROM \`adresses\` WHERE \`profile_id\` = ?`;

  connection.query(sql,[req.query.profile_id],(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
})

app.get('/get-orgid', (req, res) => {
  const sql = `SELECT * FROM \`profile\` WHERE \`user_id\` = ?`;

  connection.query(sql,[req.query.user_id],(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
})

app.post('/send-programm', (req, res) => {
  const { programm, org_id } = req.body;
  const sql = `INSERT INTO \`programm\`(\`name\`, \`hours\`, \`spec_main\`, \`spec_dop\`, \`full_name\`, \`short_content\`, \`programm_type\`, \`adress\`, \`org_id\`, \`status\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    programm.programmName,
    programm.hours,
    programm.mainSpec,
    programm.dopSpec,
    programm.fullName,
    programm.description,
    programm.programmType,
    programm.adress,
    Number(org_id),
    programm.status
  ];

  connection.query(sql, params, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
});

app.get('/get-programs', (req, res) => {
  const sql = `SELECT \`programm_id\`, \`name\`, \`hours\`, \`spec_main\`, \`spec_dop\`, \`full_name\`, \`short_content\`, \`programm_type\`, \`adress\`, \`org_id\`, \`status\` FROM \`programm\` WHERE \`org_id\` = ?`;

  connection.query(sql,[req.query.org_id],(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
})

app.get('/get-profile', (req, res) => {
  const sql = `SELECT * FROM \`profile\` WHERE \`user_id\` = ?`;

  connection.query(sql,[req.query.user_id],(error, results) => {
    if (error) {
      res.status(500).json({ error: 'Ошибка при выполнении запроса к базе данных' });
      console.log(error.code, error.message);
    } else {
      res.send(results);
    }
  });
})


app.listen(port, () => {
  console.log(`Запущен на ${port} порту`);
})
