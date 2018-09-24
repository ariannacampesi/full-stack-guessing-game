const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/guessing_game');

db.define('winner', {
  name: Sequelize.STRING,
  guesses: Sequelize.INTEGER,
});

module.exports = db;
