const express = require("express");
const dotenv = require("dotenv");
const db = require("./database");
const app = express();
dotenv.config();

app.use(express.json());

app.get("/contacts/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM contacts WHERE id = ?", id, (err, results) => {
    if (err) {
      console.error(err);
    }

    return res.send(results[0]);
  });
});

app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts", (err, results) => {
    if (err) {
      console.error(err);
    }

    return res.send(results);
  });
});

app.post("/contacts", (req, res) => {
  // const { name, phone } = req.body;
  const name = req.body.name;
  const phone = req.body.phone;

  if (!name || !phone) {
    return res.send("The `name` and the `phone` params are required");
  }

  const data = {
    name: name,
    phoneNumber: phone
  };

  db.query("INSERT INTO contacts SET ?", data, (err, results) => {
    if (err) {
      console.error(err);
    }

    return res.send({ id: results.insertId });
  });
});

app.put("/contacts/:id", (req, res) => {
  const id = req.params.id;

  // const { name, phone } = req.body;
  const name = req.body.name;
  const phone = req.body.phone;

  if (!name || !phone) {
    return res.send("The `name` and the `phone` params are required");
  }

  db.query("UPDATE contacts SET name = ?, phoneNumber = ? WHERE id = ?", [name, phone, id], (err, results) => {
    if (err) {
      console.error(err);
    }

    return res.send({ updated: results.affectedRows > 0 });
  });
});

app.delete("/contacts/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM contacts WHERE id = ?", id, (err, results) => {
    if (err) {
      console.error(err);
    }

    return res.send({ deleted: results.affectedRows > 0 });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening to port ${PORT}`));
