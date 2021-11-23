const UI = (() => {
  const displayRedMark = (row, col) => {
    const tile = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    tile.classList.add('red-mark');
  };

  const render = (board) => {
    // render when a ship is shot or missed shot
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j].isShot && board[i][j].hasShip !== '') {
          displayRedMark(i, j);
        }
      }
    }

    // if player's board then display where ship is, if computer then is it hidden
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
