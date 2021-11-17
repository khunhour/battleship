class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
    this.isSunk = false;
  }

  hit(number) {
    Ship.hits.push(number);
  }

  isSunk() {
    if (Ship.length === Ship.hits.length) {
      Ship.isSunk = true;
    }
  }
}

module.exports = Ship;
