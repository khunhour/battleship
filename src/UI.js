const UI = (() => {
  const displayRedMark = (player, row, col) => {
    const playerName = player.name;
    const tile = document.querySelector(
      `#${playerName}-grid [data-row="${row}"][data-col="${col}"]`
    );
    tile.classList.add('red-mark');
  };

  const displayMissedShot = (player, row, col) => {
    const playerName = player.name;
    const tile = document.querySelector(
      `#${playerName}-grid [data-row="${row}"][data-col="${col}"]`
    );
    tile.classList.add('missed-mark');
  };

  const displayPlayerShips = (player, row, col, ship) => {
    const playerName = player.name;
    const tile = document.querySelector(
      `#${playerName}-grid [data-row="${row}"][data-col="${col}"]`
    );
    tile.classList.add(`ship-mark${ship}`);
  };

  const updateRemainingShip = (player) => {
    const remainingShips = player.gameboard.allShips.filter(
      (ship) => ship.isSunk === false
    );
    const playerside = document.querySelector(`.${player.name}-side .ship-num`);
    playerside.textContent = `Ships Remaining: ${remainingShips.length}`;
  };

  // render UI update on gamesboards
  const render = (player) => {
    // render when a ship is shot or missed shot
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (
          player.gameboard.board[i][j].isShot &&
          player.gameboard.board[i][j].hasShip !== ''
        ) {
          displayRedMark(player, i, j);
        } else if (
          player.gameboard.board[i][j].isShot &&
          player.gameboard.board[i][j].hasShip === ''
        ) {
          displayMissedShot(player, i, j);
        }
        const ship = player.gameboard.board[i][j].hasShip;
        if (ship !== '' && player.name === 'human') {
          displayPlayerShips(player, i, j, ship);
        }
      }
    }
    updateRemainingShip(player);
  };
  // disable any pointer event of the according UI with or without fade effect
  const disableUI = (id, hasFade) => {
    const board = document.querySelector(`#${id}`);
    board.classList.add('no-event');
    if (hasFade) {
      board.classList.add('fade');
    }
  };

  // enable all pointer events of according UI
  const enableUI = (id) => {
    const board = document.querySelector(`#${id}`);
    board.classList.remove('no-event');
    board.classList.remove('fade');
  };

  // create initial empty gameboard
  const createBoard = () => {
    const playerGrid = document.getElementById('human-grid');
    const computerGrid = document.getElementById('computer-grid');
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const computerDiv = document.createElement('div');
        computerDiv.classList.add('tile');
        computerDiv.dataset.row = i;
        computerDiv.dataset.col = j;
        const humanDiv = document.createElement('div');
        humanDiv.classList.add('tile');
        humanDiv.dataset.row = i;
        humanDiv.dataset.col = j;
        playerGrid.appendChild(humanDiv);
        computerGrid.appendChild(computerDiv);
      }
    }
    disableUI('computer-grid', true);
  };

  const restartBoard = () => {
    document.getElementById('human-grid').textContent = '';
    document.getElementById('computer-grid').textContent = '';
    const shipNum = document.querySelectorAll('.ship-num');
    shipNum.forEach((element) => {
      const div = element;
      div.textContent = 'Ships Remaining: 0';
    });
    createBoard();
  };

  return {
    createBoard,
    render,
    updateRemainingShip,
    disableUI,
    restartBoard,
    enableUI,
  };
})();

export default UI;
