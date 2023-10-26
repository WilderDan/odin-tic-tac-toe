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

    let gameOver = false;
    let winner = null;
    let winningLine = null;
    let currentPlayer = playerOne;

    function switchPlayers() {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    function checkForGameOver() {
      for (line of lines) {
        if (
          board[line[0]] !== "" &&
          board[line[0]] === board[line[1]] &&
          board[line[1]] === board[line[2]]
        ) {
          gameOver = true;
          winner = board[line[0]];
          winningLine = line;
          return;
        }
      }

      if (!board.includes("")) gameOver = true;
    }

    const getBoard = () => board;

    const getCurrentPlayer = () => currentPlayer;

    const isGameOver = () => gameOver;

    const getWinner = () => winner;

    const getWinningLine = () => winningLine;

    const selectCell = (index) => {
      if (board[index] !== "" || gameOver) return;

      board[index] = currentPlayer;
      checkForGameOver();

      switchPlayers();
    };

    const reset = () => {
      board.fill("");
      gameOver = false;
      winner = null;
      winningLine = null;
      currentPlayer = playerOne;
    };

    return {
      getBoard,
      getCurrentPlayer,
      isGameOver,
      getWinner,
      getWinningLine,
      selectCell,
      reset,
    };
  })();

  // DOM cache
  const gameBoardCellElems = Array.from(
    document.getElementsByClassName("gameBoard__cell")
  );

  const gameMessage = document.getElementById("gameMessage");
  const resetBtn = document.getElementById("resetBtn");
  const aiState = document.getElementById("aiState");
  const aiSwitch = document.getElementById("aiSwitch");

  // Event Binding
  gameBoardCellElems.forEach((cell) =>
    cell.addEventListener("click", selectCell)
  );

  resetBtn.addEventListener("click", clearGameBoard);
  aiSwitch.addEventListener("click", aiToggle);

  // Render
  function render() {
    aiState.innerText = aiSwitch.checked ? "ON" : "OFF";

    gameBoardCellElems.forEach((cell, index) => {
      let marker = Game.getBoard()[index];
      cell.innerText = marker;
      if (marker !== "") {
        cell.classList.remove("hoverEnabled");
      }
    });

    const isGameOver = Game.isGameOver();

    const message = isGameOver
      ? getGameOverMessage(Game.getWinner())
      : `${Game.getCurrentPlayer()}'s turn.`;

    if (isGameOver) {
      gameBoardCellElems.forEach((cell) =>
        cell.classList.remove("hoverEnabled")
      );

      if (Game.getWinner() !== null) {
        for (index of Game.getWinningLine()) {
          gameBoardCellElems[index].classList.add("winningCell");
        }
      } else {
        gameBoardCellElems.forEach((cell) => cell.classList.add("tieCell"));
      }
    }
    gameMessage.innerText = message;
  }

  // Other Functions
  function selectCell(e) {
    Game.selectCell(e.target.dataset.index);
    render();
  }

  function clearGameBoard(e) {
    Game.reset();
    gameBoardCellElems.forEach((cell) => {
      cell.classList.remove("winningCell");
      cell.classList.remove("tieCell");
      cell.classList.add("hoverEnabled");
    });
    render();
  }

  function getGameOverMessage(winner) {
    return winner ? `${winner} wins!` : "Tie!";
  }

  function aiToggle(e) {
    render();
  }

  render();
})();
