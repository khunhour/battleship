/* eslint-disable prefer-destructuring */
const PlacingShips = (() => {
  const isOutOfRange = (coord) => {
    if (coord[0] > 9 || coord[1] > 9 || coord[0] < 0 || coord[1] < 0) {
      return true;
    }
    return false;
  };

  const checkplacementOutsideBoard = (coord, length, direction) => {
    if (direction === 'horizontal') {
      if (length > 10 - coord[1]) return true;
      return false;
    }
    if (length > 10 - coord[0]) return true;
    return false;
  };

  const checkAlreadyHasShip = (player, coord, length, direction) => {
    let hasShip = false;
    let row = Number(coord[0]);
    let col = Number(coord[1]);

    for (let i = 0; i < length; i++) {
      // surrrounding coordinates that are valid(no -1 no 10)
      const surroundingCoord = [
        [row + 1, col],
        [row - 1, col],
        [row, col + 1],
        [row, col - 1],
        [row - 1, col - 1],
        [row - 1, col + 1],
        [row + 1, col + 1],
        [row + 1, col - 1],
      ].filter((element) => !isOutOfRange(element));
      // loop through to check if the surrounding coord has ships
      for (let j = 0; j < surroundingCoord.length; j++) {
        const x = surroundingCoord[j][0];
        const y = surroundingCoord[j][1];
        if (player.gameboard.board[x][y].hasShip !== '') {
          hasShip = true;
        }
      }
      // check if the actual coord itself has ship
      if (player.gameboard.board[row][col].hasShip !== '') {
        hasShip = true;
      }

      if (direction === 'horizontal') {
        col++;
      } else {
        row++;
      }
    }
    return hasShip;
  };

  const getValidPlacement = (player, length, direction) => {
    let row;
    let col;
    if (direction === 'horizontal') {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * (10 - length));
    } else {
      row = Math.floor(Math.random() * (10 - length));
      col = Math.floor(Math.random() * 10);
    }
    if (checkAlreadyHasShip(player, [row, col], length, direction)) {
      return getValidPlacement(player, length, direction);
    }
    return [row, col];
  };

  const getShipDirection = () => {
    if (document.querySelector('#rotate:checked') === null) {
      return 'vertical';
    }
    return 'horizontal';
  };

  const hoverShipUI = (player, tile, length, direction) => {
    const row = Number(tile.dataset.row);
    const col = Number(tile.dataset.col);
    let hoverLength = length;
    let className = 'green-hovered-tile';
    // display red when at the edge of the board and length is out of range
    if (direction === 'horizontal') {
      if (length > 10 - col) {
        hoverLength = 10 - col;
        className = 'red-hovered-tile';
      }
    } else if (direction === 'vertical') {
      if (length > 10 - row) {
        hoverLength = 10 - row;
        className = 'red-hovered-tile';
      }
    }
    // display red on coord that has ships attached near it
    if (checkAlreadyHasShip(player, [row, col], hoverLength, direction)) {
      className = 'red-hovered-tile';
    }
    for (let i = 0; i < hoverLength; i++) {
      let x;
      let y;
      if (direction === 'horizontal') {
        x = row;
        y = col + i;
      } else {
        x = row + i;
        y = col;
      }
      const hoveredDiv = document.querySelector(
        `#human-grid [data-row="${x}"][data-col="${y}"]`
      );
      hoveredDiv.classList.add(className);
    }
  };

  const removeHoverShipUI = () => {
    const greenHoveredTiles = document.querySelectorAll('.green-hovered-tile');
    greenHoveredTiles.forEach((tile) => {
      tile.classList.remove('green-hovered-tile');
    });
    const redHoveredTiles = document.querySelectorAll('.red-hovered-tile');
    redHoveredTiles.forEach((tile) => {
      tile.classList.remove('red-hovered-tile');
    });
  };

  const placeShipRandomly = (player) => {
    const AllShipsLength = [5, 4, 3, 2, 2, 1];
    AllShipsLength.forEach((length) => {
      const direction = ['horizontal', 'vertical'];
      const randomDirection = direction[Math.floor(Math.random() * 2)];
      const coord = getValidPlacement(player, length, randomDirection);
      player.gameboard.placeShip(length, coord, randomDirection);
    });
  };

  return {
    placeShipRandomly,
    hoverShipUI,
    removeHoverShipUI,
    checkAlreadyHasShip,
    checkplacementOutsideBoard,
    getShipDirection,
  };
})();

export default PlacingShips;
