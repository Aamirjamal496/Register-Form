const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

// Register endpoint
app.post("/register", (req, res) => {
  const { first, last, email, password, company, phone, subject, option } =
    req.body;
  const sql =
    "INSERT INTO signup (first_name, last_name, email, password, company, phone, subject, option) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [first, last, email, password, company, phone, subject, option],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: "Error registering user" });
      } else {
        res.status(200).send({ message: "User registered successfully" });
      }
    }
  );
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.status(500).send({ error: "Error logging in" });
    } else if (result.length > 0) {
      res.status(200).send({ message: "Login successful" });
    } else {
      res.status(401).send({ error: "Incorrect email or password" });
    }
  });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
