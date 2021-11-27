const Coordinates = (() => {
  const isArrayInArray = (array, item) => {
    const itemString = JSON.stringify(item);
    const containsArray = array.some(
      (element) => JSON.stringify(element) === itemString
    );
    return containsArray;
  };

  const getRandomCoord = (player) => {
    console.log('getRandomCoord');
    let randomNum = `0${Math.floor(Math.random() * 100)}`;
    randomNum = randomNum.slice(-2);
    const coord = randomNum.split('').map(Number);

    if (isArrayInArray(player.moves, coord)) {
      return getRandomCoord(player);
    }
    player.moves.push(coord);
    return coord;
  };

  const getSmartCoord = (player, coord) => {
    console.log('getsmartCoord');
    const row = coord[0];
    const col = coord[1];
    const possibleMoves = [
      [row, col + 1],
      [row, col - 1],
      [row + 1, col],
      [row - 1, col],
    ];
    possibleMoves.forEach((move) => {
      // remove possible coords that are not within board range
      console.log(move);
      console.log('forEach');
      //   console.log('forEach row');
      //   console.log(`move[0]:${move[0]}`);
      //   console.log(move[0] < 0);
      //   console.log('forEach col');
      //   console.log(`move[1]:${move[1]}`);
      //   console.log(move[1] < 0);
      if (move[0] < 0 || move[0] > 9 || move[1] < 0 || move[1] > 9) {
        console.log('minus outside range');
        const index = possibleMoves.findIndex(
          (element) => JSON.stringify(element) === JSON.stringify(move)
        );
        possibleMoves.splice(index, 1);
      }
      // remove possible coords that already used
      if (isArrayInArray(player.moves, move)) {
        console.log('already played');
        const index = possibleMoves.findIndex(
          (element) => JSON.stringify(element) === JSON.stringify(move)
        );
        console.log(index);
        console.log(possibleMoves[index]);
        possibleMoves.splice(index, 1);
      }
    });

    possibleMoves.forEach((move) => {
      player.smartMoves.push(move);
    });
    console.log(player.smartMoves);
    if (possibleMoves.length === 0) {
      return getRandomCoord();
    }
    const smartCoord = player.smartMoves.shift();
    player.moves.push(smartCoord);
    return smartCoord;
  };

  const calculateNextBestCoord = (player, enemy, coord) => {
    const row = coord[0];
    const col = coord[1];
    if (enemy.gameboard.board[row][col].hasShip === '') return;
    const possibleMoves = [
      [row, col + 1],
      [row, col - 1],
      [row + 1, col],
      [row - 1, col],
    ];
    // array.slice to create a copy
    possibleMoves.slice().forEach((move) => {
      // remove possible coords that are not within board range
      console.log(move);
      console.log('forEach');
      if (move[0] < 0 || move[0] > 9 || move[1] < 0 || move[1] > 9) {
        console.log('minus outside range');
        const index = possibleMoves.findIndex(
          (element) => JSON.stringify(element) === JSON.stringify(move)
        );
        possibleMoves.splice(index, 1);
      }
      // remove possible coords that already used
      if (isArrayInArray(player.moves, move)) {
        console.log('already played');
        const index = possibleMoves.findIndex(
          (element) => JSON.stringify(element) === JSON.stringify(move)
        );
        console.log(index);
        console.log(possibleMoves[index]);
        possibleMoves.splice(index, 1);
      }
    });
    possibleMoves.forEach((move) => {
      player.smartMoves.push(move);
    });
  };
  const getCoord = (player, enemy) => {
    if (player.moves.length === 0) return getRandomCoord(player);
    if (player.smartMoves.length !== 0) {
      const smartMove = player.smartMoves[0];
      player.moves.push(smartMove);
      player.smartMoves.shift();
      return smartMove;
    }
    return getRandomCoord(player);
  };

  return { getCoord, calculateNextBestCoord };
})();

export default Coordinates;
