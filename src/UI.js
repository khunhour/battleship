const UI = (() => {
  const displayRedMark = (row, col) => {
    const tile = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    tile.classList.add('red-mark');
  };
  const displayMissedShot = (row, col) => {
    const tile = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    tile.classList.add('missed-mark');
  };
  const displayPlayerShips = (row, col) => {
    const tile = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    tile.classList.add('ship-mark');
  };

  const render = (player) => {
    // render when a ship is shot or missed shot
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (player.board[i][j].isShot && player.board[i][j].hasShip !== '') {
          displayRedMark(i, j);
        } else if (
          player.board[i][j].isShot &&
          player.board[i][j].hasShip === ''
        ) {
          displayMissedShot(i, j);
        }

        // if player's board then display where ship is, if computer then is it hidden
        if (player.name === 'player') {
          if (player.board[i][j].hasShip !== '') {
            displayPlayerShips(i, j);
          }
        }
      }
    }
  };

  const createBoard = () => {
    const playerGrid = document.getElementById('player-grid');
    const computerGrid = document.getElementById('computer-grid');

    for (let i = 0; i < 100; i++) {
      const div = document.createElement('div');
      div.classList.add('tile');
      playerGrid.appendChild(div);
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement('div');
        div.classList.add('tile');
        div.dataset.row = i;
        div.dataset.col = j;
        computerGrid.appendChild(div);
      }
    }
  };

  return { createBoard, render };
})();

export default UI;
