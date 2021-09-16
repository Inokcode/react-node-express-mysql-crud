const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'inok',
  database: 'cruddatabase',
});

app.use(cors());
app.use(express.json());

app.post('/api/insert', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    'INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)';
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log('new post record Effected');
  });
});

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM movie_reviews';
  db.query(sqlSelect, (err, result) => {
    if (err) throw err;
    // console.log(result);
    console.log('get record Effected');
    res.send(result);
  });
});
//
app.delete('/api/delete/:movieName', (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = 'DELETE FROM movie_reviews WHERE movieName = ?';
  db.query(sqlDelete, name, (err, result) => {
    if (err) throw err;
    console.log('delete record Effected');
    res.send(result);
  });
});
//
app.put('/api/update', (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const sqlUpdate =
    'UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?';
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) throw err;
    console.log('update record Effected');
    res.send(result);
  });
});
//
// app.get('/', (req, res) => {
//   const sqlInsert =
//     "INSERT INTO movie_reviews (movieName,movieReview) VALUES ('STAPPUS','God bless you')";
//   db.query(sqlInsert, (err, result) => {
//     if (err) throw err;
//     res.send('Hello World!');
//     console.log('1 record inserted');
//   });
// });
app.listen(3006, () => {
  console.log('Runnig on port 3006');
});
