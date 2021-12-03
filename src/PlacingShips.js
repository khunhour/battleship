/* eslint-disable prefer-destructuring */
const PlacingShips = (() => {
  const isOutOfRange = (coord) => {
    if (coord[0] > 9 || coord[1] > 9 || coord[0] < 0 || coord[1] < 0) {
      return true;
    }
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
      console.log(surroundingCoord);
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

  const hoverShipUI = (tile, length, direction) => {
    const row = tile.dataset.row;
    const col = tile.dataset.col;
    let hoverLength = length;
    if (direction === 'horizontal') {
      let className = 'green-hovered-tile';
      if (length > 10 - col) {
        hoverLength = 10 - col;
        className = 'red-hovered-tile';
      }
      for (let i = 0; i < hoverLength; i++) {
        const x = row;
        const y = Number(col) + i;
        const hoveredDiv = document.querySelector(
          `#human-grid [data-row="${x}"][data-col="${y}"]`
        );
        hoveredDiv.classList.add(className);
      }
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

  // const placeShipManually = (e) => {
  //   const AllShipsLength = [5, 4, 3, 2, 2, 1];
  //   AllShipsLength.forEach((length) => {
  //     const direction = getShipDirection(e);

  //     const coord = getValidPlacement(player, length, randomDirection);
  //     player.gameboard.placeShip(length, coord, randomDirection);
  //   });
  //   console.log(e.target);
  // };

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
  };
})();

export default PlacingShips;
