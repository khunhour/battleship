const Gameboard = require('./gameboardFactory');

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.moves = [];
  }

  attack(enemy, coord) {
    console.log('attak pplayer');
    console.log(coord);
    enemy.gameboard.recieveAttack(coord);
  }

  getRandomCoord() {
    let randomNum = `0${Math.floor(Math.random() * 100)}`;
    randomNum = randomNum.slice(-2);
    if (this.moves.includes(randomNum)) {
      return this.getRandomCoord();
    }
    this.moves.push(randomNum);
    const coord = randomNum.split('').map(Number);
    return coord;
  }
}

module.exports = Player;
