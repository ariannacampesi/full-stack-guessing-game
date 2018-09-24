const express = require('express');
const app = express();

const db = require('./db.js');

const { resolve } = require('path');

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, '..', 'views/index.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(resolve(__dirname, '..', 'views/game.html'));
});

app.get('/game.js', (req, res) => {
  res.sendFile(resolve(__dirname, '..', 'clientJS/game.js'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(resolve(__dirname, '..', 'stylesheets/style.css'));
});

const Winner = db.model('winner');
app.get('/winners', async (req, res) => {
  const winners = await Winner.findAll();
  res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <link rel="stylesheet" href="/style.css" />
      <title>Guessing Game</title>
    </head>
    <body>
      <h1>Past Winners</h1>
      <table border="1">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Guesses</th>
          </tr>
          ${winners
            .map(
              winner =>
                `<tr><td>${winner.name}</td><td>${winner.guesses}</td></tr>`
            )
            .join('')}
        </tbody>
      </table>
      <h3>Click <a href="/">here</a> to return Home</h3>
    </body>
    </html>`
  );
});

app.post('/winners', async (req, res) => {
  const { name, guesses } = req.body;
  await Winner.create({ name, guesses });
  res.sendFile(resolve(__dirname, '..', 'views/congratulations.html'));
});

(async function createTablesAndListenForRequests() {
  await db.sync();
  app.listen(3000);
})();
