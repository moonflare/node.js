const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const db = require("./database");
const app = express();
dotenv.config();

app.get('/', (req, res) => {
  const id = req.query.id; // const { id } = req.query;

  if (!id) {
    return res.send("The `id` query param is required");
  }

  const query = db.query('SELECT * FROM contacts WHERE id = ?', id, (err, results)=> {
    if (err) {
      console.error(err);
    }

    return res.send(results);
  });
});

app.get('/create', (req, res) => {
  // const { name, phone } = req.query;
  const name = req.query.name;
  const phone = req.query.phone;

  if (!name || !phone) {
    return res.send("The `name` and the `phone` query params are required");
  }

  const data = {
    name: name,
    phoneNumber: phone
  }

  const query = db.query('INSERT INTO contacts SET ?', data, (err, results) => {
    if (err) {
      console.error(err);
    }

    return res.send(`The latest created id is: ${results.insertId}`);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening to port ${PORT}`));