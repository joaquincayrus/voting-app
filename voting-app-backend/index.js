const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
db.serialize(() => {
    // Queries scheduled here will be serialized.
    //TODO: Create table crea una tabla nueva y datos de prueba hay que cambiar los atributos de la tabla para que tome todos los necesarios
    db.run('CREATE TABLE election(title text)')
      .run(`INSERT INTO election(title)
            VALUES('Election 1'),
                  ('Election 2'),
                  ('Election 3')`)
      .each(`SELECT title FROM election`, (err, row) => {
        if (err){
          throw err;
        }
        console.log(row.title);
      });
});

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World, from express');
})
app.get('/election', (req, res) => {
    let sql = `SELECT *
            FROM election`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.title);
        });
        res.send(rows);
    });        
})
app.post('/election', (req, res) => {
    const election = req.body;
    // Output the election to the console for debugging
    console.log(election);
    //TODO: Agregar la nueva elección a la base de datos en memoria
    res.send('Election is added to the database');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`)).on("close", () => {
    // close the database connection
    db.close((err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});
