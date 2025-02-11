const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '2004', 
  database: 'student'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.post('/submit', (req, res) => {
  const { PRN, FullName, Branch, Phone } = req.body;

  const sql = 'INSERT INTO Studentinfo (id, FullName, Branch, Phone) VALUES (?, ?, ?, ?)';
  db.query(sql, [PRN, FullName, Branch, Phone], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving data' }); 
    } else {
      res.status(200).json({ message: 'Data saved successfully' }); 
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
