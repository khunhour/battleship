const UI = (() => {
  const displayRedMark = (player, row, col) => {
    if (player.name === 'computer') {
      const tile = document.querySelector(
        `#computer-grid [data-row="${row}"][data-col="${col}"]`
      );
      tile.classList.add('red-mark');
    } else {
      const tile = document.querySelector(
        `#human-grid [data-row="${row}"][data-col="${col}"]`
      );
      tile.classList.add('red-mark');
    }
  };
  const displayMissedShot = (player, row, col) => {
    if (player.name === 'computer') {
      const tile = document.querySelector(
        `#computer-grid [data-row="${row}"][data-col="${col}"]`
      );
      tile.classList.add('missed-mark');
    } else {
      const tile = document.querySelector(
        `#human-grid [data-row="${row}"][data-col="${col}"]`
      );
      tile.classList.add('missed-mark');
    }
  };
  const displayPlayerShips = (player, row, col) => {
    if (player.name === 'computer') {
      const tile = document.querySelector(
        `#computer-grid [data-row="${row}"][data-col="${col}"]`
      );
      tile.classList.add('ship-mark');
    } else {
      const tile = document.querySelector(
        `#human-grid [data-row="${row}"][data-col="${col}"]`
      );
      tile.classList.add('ship-mark');
    }
  };

  const render = (player) => {
    console.log(player);

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

        if (player.gameboard.board[i][j].hasShip !== '') {
          displayPlayerShips(player, i, j);
        }
        // if player's gameboard then display where ship is, if computer then is it hidden
        // if (player.name !== 'computer') {
        // }
      }
    }
  };

  const createBoard = () => {
    const playerGrid = document.getElementById('human-grid');
    const computerGrid = document.getElementById('computer-grid');

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const computerDiv = document.createElement('div');
        computerDiv.classList.add('tile');
        computerDiv.dataset.row = i;
        computerDiv.dataset.col = j;
        const humanDiv = computerDiv.cloneNode();

        playerGrid.appendChild(humanDiv);
        computerGrid.appendChild(computerDiv);
      }
    }
  };

  return { createBoard, render };
})();

export default UI;
