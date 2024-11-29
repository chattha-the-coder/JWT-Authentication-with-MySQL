const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const JWT_SECRET = "haq@123";
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "tokend",
});

app.use(express.urlencoded({ extended: false }));

//MIDDLEWARE
const verify_t = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, reslt) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = reslt;
    console.log(req.user);

    next();
  });
};

db.connect((error) => {
  if (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  console.log("this is haq chattha");
  res.json({ status: "all data shown" });
});

app.post("/reg", async function (req, res) {
  const name = req.body.name;
  const pass = req.body.pass;

  const hashedPassword = await bcrypt.hash(pass, 10);
  console.log(hashedPassword);

  var sql = `Insert INTO tokends (name,pass) VALUES ('${name}', '${hashedPassword}')`;

  db.query(sql, function (error, result) {
    if (error) throw error;
  });

  console.log(req.body);
  res.json({ status: " The user has been sent to the server" });
});

app.post("/login", async (req, res) => {
  const name = req.body.name;
  const pass = req.body.pass;

  const sql = "SELECT * FROM tokends WHERE name = ?";
  db.query(sql, [name], async (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(pass, user.pass);
    console.log(user.pass);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ user: user.Id }, JWT_SECRET);
    res.status(200).json({ token });
  });
});

app.get("/protect", verify_t, (req, res) => {
  res.send(`Hello, User : ${req.user}. This is a protected route!`);
});

app.get("/mytickets", verify_t, async (req, res) => {
  const userId = req.user.user;
  console.log(userId, "this is the user id of you which is logging");

  const sql = `SELECT * FROM ticket WHERE assignee = ? OR reporter = ?`;

  db.query(sql, [userId, userId], async (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No tickets found for this user" });
    }
    await res
      .status(200)
      .json({ message: `Tickets for user ID: ${userId}`, tickets: results });
  });
});

app.listen(8001, (error) => {
  if (error) throw error;
});
