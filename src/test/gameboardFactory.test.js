const { test, expect } = require('@jest/globals');

const Gameboard = require('../factories/gameboardFactory');

const gameboard = new Gameboard();

test('initial board', () => {
  expect(gameboard.allShips).toStrictEqual([]);
  expect(gameboard.board.length).toBe(10);
  expect(gameboard.board[0].length).toBe(10);
  expect(gameboard.board[0][0]).toStrictEqual({
    hasShip: '',
    isShot: false,
  });
});

// test('placing ships', () => {
//   gameboard.placeShip(4, [1, 2], 'vertical');
//   expect()
// });
