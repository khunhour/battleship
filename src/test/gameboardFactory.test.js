const { test, expect } = require('@jest/globals');
const Gameboard = require('../factories/GameboardFactory');

test.skip('initial board',() =>{
    const board = new Gameboard;
    expect(board).toBe([]);
    expect(allShips).toBe([]);
});