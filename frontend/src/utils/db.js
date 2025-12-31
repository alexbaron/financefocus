const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const app = express();
const port = 3001;

// Connect to SQLite database
const db = new Database('./database.db');

// Create table if it doesn't exist
db.exec(`CREATE TABLE IF NOT EXISTS budget (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  description TEXT,
  amountEur REAL,
  amountCad REAL,
  type TEXT
)`);

app.use(cors());
app.use(express.json());

app.post('/add-budget-item', (req, res) => {
  const { date, description, amountEur, amountCad, type } = req.body;
  const stmt = db.prepare(`INSERT INTO budget (date, description, amountEur, amountCad, type) VALUES (?, ?, ?, ?, ?)`);
  const info = stmt.run(date, description, amountEur, amountCad, type);
  res.send({ id: info.lastInsertRowid });
});

app.get('/budget-items', (req, res) => {
  const stmt = db.prepare(`SELECT * FROM budget`);
  const rows = stmt.all();
  res.send(rows);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});