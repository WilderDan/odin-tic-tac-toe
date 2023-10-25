(function App() {
  const Game = (function () {
    const board = new Array(9).fill("");
    const getBoard = () => board;
    const selectCell = (index) => (board[index] = "X");
    return { getBoard, selectCell };
  })();

  // DOM cache
  const gameBoardCellElems = Array.from(
    document.getElementsByClassName("gameBoard__cell")
  );

  // Event Binding
  gameBoardCellElems.forEach((cell) =>
    cell.addEventListener("click", handleClick)
  );

  // Render
  function render() {
    gameBoardCellElems.forEach(
      (cell, index) => (cell.innerHTML = Game.getBoard()[index])
    );
  }

  // Other Functions
  function handleClick(e) {
    const index = e.target.dataset.index;
    Game.selectCell(index);
    render();
  }

  render();
})();
