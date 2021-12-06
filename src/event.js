/* eslint-disable prefer-destructuring */
import Game from './Game';
import PlacingShips from './PlacingShips';

const Event = (() => {
  const startTileEvent = () => {
    const computerGrid = document.querySelector('#computer-grid');
    computerGrid.addEventListener('click', (e) => {
      const row = Number(e.target.dataset.row);
      const col = Number(e.target.dataset.col);
      Game.startAttackRound(row, col);
    });

    // const computerTiles = document.querySelectorAll('#computer-grid .tile');
    // computerTiles.forEach((tile) => {
    //   tile.addEventListener('click', (e) => {
    //     const row = Number(e.target.dataset.row);
    //     const col = Number(e.target.dataset.col);
    //     Game.startAttackRound(row, col);
    //   });
    // });
  };

  const startPlaceShipsEvent = () => {
    const humanGrid = document.querySelector('#human-grid');
    humanGrid.addEventListener('mouseover', Game.displayHoverEffect);
    humanGrid.addEventListener('mouseleave', PlacingShips.removeHoverShipUI);
    humanGrid.addEventListener('click', Game.placeShipManually);
  };

  const startButtonEvent = () => {
    const startBtn = document.getElementById('start');
    startBtn.addEventListener('click', () => {
      Game.startGame();
    });

    const restartBtn = document.getElementById('restart');
    restartBtn.addEventListener('click', () => {
      Game.restartGame();
    });

    const randomizeBtn = document.getElementById('randomize');
    randomizeBtn.addEventListener('click', Game.randomizeShip);

    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', Game.restartGame);
  };

  return { startButtonEvent, startPlaceShipsEvent, startTileEvent };
})();

export default Event;
