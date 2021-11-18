const { test, expect } = require('@jest/globals');
const Ship = require('../factories/shipFactory');

test('new ship template', () => {
  const summer = new Ship(2, 0);
  expect(summer.shipId).toBe(0);
  expect(summer.length).toBe(2);
  expect(summer.isSunk).toBeFalsy();
  expect(summer.hits).toStrictEqual([]);
  expect(summer.isSunk).toBe(false);
});

test('different ships has different IDs', () => {
  const shipOne = new Ship(4, 0);
  const shipTwo = new Ship(1, 1);
  const shipThree = new Ship(3, 2);
  expect(shipOne.shipId).toBe(0);
  expect(shipTwo.shipId).toBe(1);
  expect(shipThree.shipId).toBe(2);
});

test('hit a ship with location', () => {
  const ship = new Ship(3, 0);
  ship.hit(15);
  ship.hit(0);
  expect(ship.hits).toContain(15);
  expect(ship.hits).toContain(0);
});
// ships length can never be over 10
// ships can no longer be hit after sunk
test('ship is not yet sunk', () => {
  const ship = new Ship(3, 0);
  ship.hit(9);
  ship.hit(8);
  ship.checkSunkState();
  expect(ship.isSunk).toBeFalsy();
});

test('ship is sunk', () => {
  const ship = new Ship(2, 0);
  ship.hit(9);
  ship.checkSunkState();
  expect(ship.isSunk).toBe(false);
  ship.hit(8);
  ship.checkSunkState();
  expect(ship.isSunk).toBe(true);
});
