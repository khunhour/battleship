const { test, expect } = require('@jest/globals');
const Ship = require('../factories/shipFactory');

test('creating new ship', () => {
  const summer = new Ship(2);
  expect(summer.length).toBe(2);
  expect(summer.isSunk).toBeFalsy();
});
