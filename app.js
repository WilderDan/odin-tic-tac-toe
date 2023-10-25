(function App() {
  const Game = (function () {
    const board = new Array(9).fill("");
    const playerOne = "X";
    const playerTwo = "O";

    let currentPlayer = playerOne;
    function switchPlayers() {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    const getBoard = () => board;

    const selectCell = (index) => {
      if (board[index] !== "") return;
      board[index] = currentPlayer;
      switchPlayers();
    };

    const resetBoard = () => {
      board.fill("");
    };

    return { getBoard, selectCell, resetBoard };
  })();

  // DOM cache
  const gameBoardCellElems = Array.from(
    document.getElementsByClassName("gameBoard__cell")
  );

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
  }

  // Other Functions
  function selectCell(e) {
    Game.selectCell(e.target.dataset.index);
    render();
  }

  function clearGameBoard(e) {
    Game.resetBoard();
    render();
  }

  render();
})();
