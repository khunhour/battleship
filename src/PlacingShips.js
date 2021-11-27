const PlacingShips = () => {
  const checkAlreadyHasShip = (player, coord, length, direction) => {
    let hasShip = false;
    let row = coord[0];
    let col = coord[1];
    for (let i = 0; i < length; i++) {
      if (player.gameboard.board[row][col].hasShip) {
        hasShip = true;
      }
      if (direction === 'horizontal') {
        row++;
      } else {
        col++;
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

  const placeShipRandomly = (player) => {
    const direction = ['horizontal', 'vertical'];
    const randomDirection = direction[Math.floor(Math.random() * 2)];

    const AllShipsLength = [5, 4, 3, 2, 2, 1];
    AllShipsLength.forEach((length) => {
      const coord = getValidPlacement(player, length, randomDirection);
      player.gameboard.placeShip(length, coord, randomDirection);
    });
  };

  return { placeShipRandomly };
};

export default PlacingShips;
