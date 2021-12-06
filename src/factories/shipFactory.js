class Ship {
  constructor(length, shipId) {
    this.shipId = shipId;
    this.length = length;
    this.hits = [];
    this.isSunk = false;
  }

  hit(coord) {
    this.hits.push(coord);
  }

  updateSunkState() {
    if (this.length === this.hits.length) {
      this.isSunk = true;
    }
  }
}
module.exports = Ship;
