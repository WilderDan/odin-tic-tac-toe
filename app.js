(function App() {
  const Game = (function () {
    const board = new Array(9).fill("");
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const playerOne = "X";
    const playerTwo = "O";

    let winner = null;
    let currentPlayer = playerOne;

    function switchPlayers() {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    function checkForWinner() {
      for (line of lines) {
        if (
          board[line[0]] !== "" &&
          board[line[0]] === board[line[1]] &&
          board[line[1]] === board[line[2]]
        ) {
          winner = board[line[0]];
          return;
        }
      }

      if (!board.includes("")) winner = "tie";
    }

    const getBoard = () => board;

    const getCurrentPlayer = () => currentPlayer;

    const getWinner = () => winner;

    const selectCell = (index) => {
      if (board[index] !== "" || winner !== null) return;

      board[index] = currentPlayer;
      checkForWinner();

      switchPlayers();
    };

    const reset = () => {
      board.fill("");
      winner = null;
      currentPlayer = playerOne;
    };

    return { getBoard, getCurrentPlayer, getWinner, selectCell, reset };
  })();

  // DOM cache
  const gameBoardCellElems = Array.from(
    document.getElementsByClassName("gameBoard__cell")
  );

  const gameMessage = document.getElementById("gameMessage");
  const resetBtn = document.getElementById("resetBtn");

  // Event Binding
  gameBoardCellElems.forEach((cell) =>
    cell.addEventListener("click", selectCell)
  );

  resetBtn.addEventListener("click", clearGameBoard);

  // Render
  function render() {
    gameBoardCellElems.forEach(
      (cell, index) => (cell.innerHTML = Game.getBoard()[index])
    );

    const winner = Game.getWinner();
    const message =
      winner === null
        ? `${Game.getCurrentPlayer()}'s turn.`
        : getGameOverMessage(winner);

    gameMessage.innerText = message;
  }

  // Other Functions
  function selectCell(e) {
    Game.selectCell(e.target.dataset.index);
    render();
  }

  function clearGameBoard(e) {
    Game.reset();
    render();
  }

  function getGameOverMessage(winner) {
    return winner === "tie" ? "Tie!" : `${winner} wins!`;
  }

  render();
})();
