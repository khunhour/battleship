import Coordinates from './Coordinates';
import DragAndDrop from './dragAndDrop';
import PlacingShips from './PlacingShips';
import UI from './UI';

const Player = require('./factories/playerFactory');

const Game = (() => {
  const human = new Player('human');
  const computer = new Player('computer');
  const startGame = () => {
    PlacingShips.placeShipRandomly(human);
    PlacingShips.placeShipRandomly(computer);
    UI.render(human);
    DragAndDrop.activateDragStartEvent();
    UI.render(computer);
  };

  const restartGame = () => {
    UI.restartBoard();
    // UI.toggleBoard(human);
    // UI.toggleBoard(computer);
    human.restartPlayer();
    computer.restartPlayer();
  };

  const randomizeShip = () => {
    restartGame();
    PlacingShips.placeShipRandomly(human);
    UI.render(human);
  };

  const checkWinner = (player, enemy) => {
    const allShipsSunk = enemy.gameboard.checkAllShipsAreSunk();
    if (allShipsSunk) {
      UI.declareWinner(player);
      UI.toggleBoard(player);
      UI.toggleBoard(enemy);
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

  return { startGame, startAttackRound, restartGame, randomizeShip };
})();

export default Game;
