/* eslint-disable prefer-destructuring */
import Coordinates from './Coordinates';
import PlacingShips from './PlacingShips';
import UI from './UI';

const Player = require('./factories/playerFactory');

const Game = (() => {
  const human = new Player('human');
  const computer = new Player('computer');
  const startGame = () => {
    if (human.gameboard.allShips.length < 6) return;
    PlacingShips.placeShipRandomly(computer);
    UI.enableUI('computer-grid');
    UI.render(computer);
    UI.disableUI('button-group', true);
    UI.disableUI('start', true);
  };

  const restartGame = () => {
    UI.restartBoard();
    UI.enableUI('human-grid');
    human.restartPlayer();
    computer.restartPlayer();
    UI.enableUI('button-group');
    UI.enableUI('start');
  };

  const randomizeShip = () => {
    restartGame();
    PlacingShips.placeShipRandomly(human);
    UI.disableUI('human-grid', false);
    UI.render(human);
  };

  const checkWinner = (player, enemy) => {
    const allShipsSunk = enemy.gameboard.checkAllShipsAreSunk();
    if (allShipsSunk) {
      UI.declareWinner(player);
      UI.disableUI(`${player.name}-grid`, true);
      UI.disableUI(`${enemy.name}-grid`, true);
    }
  };

  const startAttackRound = (row, col) => {
    // human's turn to attack
    human.attack(computer, row, col);
    UI.render(computer);
    checkWinner(human, computer);

    // computer's turn to attack
    const coord = Coordinates.getCoord(computer, human);
    Coordinates.calculateNextBestCoord(computer, human, coord);
    computer.attack(human, coord[0], coord[1]);
    UI.render(human);
    checkWinner(computer, human);
  };

  const placeShipManually = (e) => {
    console.log('clicked');
    const allshipsLength = human.gameboard.allShips.length;

    const standbyShips = [5, 4, 3, 2, 2, 1];
    const length = standbyShips[allshipsLength];
    const direction = PlacingShips.getShipDirection();
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    if (PlacingShips.checkplacementOutsideBoard([row, col], length, direction))
      return;
    if (PlacingShips.checkAlreadyHasShip(human, [row, col], length, direction))
      return;
    human.gameboard.placeShip(length, [row, col], direction);
    UI.render(human);
    if (human.gameboard.allShips.length > 5) {
      UI.disableUI('human-grid', false);
    }
  };

  const displayHoverEffect = (e) => {
    PlacingShips.removeHoverShipUI();
    const direction = PlacingShips.getShipDirection();
    const shipPlaced = human.gameboard.allShips.length;
    const AllShipsLength = [5, 4, 3, 2, 2, 1];
    PlacingShips.hoverShipUI(
      human,
      e.target,
      AllShipsLength[shipPlaced],
      direction
    );
  };
  return {
    startGame,
    startAttackRound,
    restartGame,
    randomizeShip,
    placeShipManually,
    displayHoverEffect,
  };
})();

export default Game;
