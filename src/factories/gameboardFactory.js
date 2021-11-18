const Ship = require('./shipFactory');

class Gameboard {
  constructor() {
    this.board = [];
    this.allShips = [];
    this.createGrid();
  }

  createGrid() {
    for (let i = 0; i < 100; i++) {
      this.board.push({
        hasShip: "",
        isShot: false,
      });
    }
  }

  placeShip(length, location) {
    const battleship = new Ship(length);
    for (let i = location; i < length; i++) {
      this.board[i].hasShip = battleship.shipId;
    }
    this.allShips.push(battleship);
  }

  recieveAttack(location) {
    // record missed shot as isShot 
    this.board[location].isShot = true;

    if (this.checkHasShip(location)) {
      const attackedShip = this.getAttackedShip(location);
      attackedShip.hit(location);
      attackedShip.isSunk();
    }
  }

  checkHasShip(location) {
    return this.board[location].hasShip !== "";
  }

  getAttackedShip(location){
    const attackedShipId = Number(this.board[location].hasShip);
    return this.Ship[attackedShipId];
  }

  checkAllShipsAreSunk(){
    const allSunkShips = this.allShips.filter(ship => ship.isSunk);
    if(allSunkShips.length === this.allShips.length) return true;
    else return false;
  }
}


module.exports = Gameboard;