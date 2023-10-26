(function App() {
  function buildGame(playerOneStrategy, playerTwoStrategy) {
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
    // Strategy functions. 0 index for player selection
    const strategies = [null];

    const playerOne = "X";
    const playerTwo = "O";

    let gameOver = false;
    let winner = null;
    let winningLine = null;
    let currentPlayer = playerOne;

    function start() {
      // nothing to do if both are human
    }

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
      start,
      reset,
    };
  }

  function playerController({}) {}

  let game;

  // DOM cache
  const newGameBtn = document.getElementById("newGameBtn");
  const newGameDialog = document.getElementById("newGameDialog");
  const dialogClose = document.getElementById("dialog__close");
  const main = document.getElementById("main");

  const gameBoardCellElems = Array.from(
    document.getElementsByClassName("gameBoard__cell")
  );

  const gameMessage = document.getElementById("gameMessage");
  const resetBtn = document.getElementById("resetBtn");
  const aiState = document.getElementById("aiState");
  const aiSwitch = document.getElementById("aiSwitch");

  // Event Binding
  window.addEventListener("submit", startNewGame);
  newGameDialog.addEventListener("keydown", escapeKeyMod);

  gameBoardCellElems.forEach((cell) =>
    cell.addEventListener("click", selectCell)
  );
  newGameBtn.addEventListener("click", openNewGameDialog);

  aiSwitch.addEventListener("click", aiToggle);
  dialogClose.addEventListener("click", closeNewGameDialog);

  // Render
  function render() {
    aiState.innerText = aiSwitch.checked ? "ON" : "OFF";

    gameBoardCellElems.forEach((cell, index) => {
      let marker = game.getBoard()[index].toUpperCase();

      cell.innerHTML =
        marker === ""
          ? ""
          : `<img class="cellMarker" src="./icons/${marker}.svg" alt="${marker}" />`;

      if (marker !== "") {
        cell.classList.remove("hoverEnabled");
      }
    });

    const isGameOver = game.isGameOver();

    const message = isGameOver
      ? getGameOverMessage(game.getWinner())
      : `${game.getCurrentPlayer()}'s turn.`;

    if (isGameOver) {
      gameBoardCellElems.forEach((cell) =>
        cell.classList.remove("hoverEnabled")
      );

      if (game.getWinner() !== null) {
        for (index of game.getWinningLine()) {
          gameBoardCellElems[index].classList.add("winningCell");
        }
      } else {
        gameBoardCellElems.forEach((cell) => cell.classList.add("tieCell"));
      }
    }
    gameMessage.innerText = message;
  }

  // Other Functions
  function openNewGameDialog(e) {
    newGameDialog.showModal();
    main.style.display = "none";
  }

  function selectCell(e) {
    game.selectCell(e.target.dataset.index);
    render();
  }

  function startNewGame(e) {
    e.preventDefault();
    closeNewGameDialog(null);

    game = buildGame(0, 0);

    gameBoardCellElems.forEach((cell) => {
      cell.classList.remove("winningCell");
      cell.classList.remove("tieCell");
      cell.classList.add("hoverEnabled");
    });

    game.start();
    render();
  }

  function getGameOverMessage(winner) {
    return winner ? `${winner} wins!` : "Tie!";
  }

  function aiToggle(e) {
    render();
  }

  function closeNewGameDialog(e) {
    newGameDialog.close();
    main.style.display = "flex";

    if (!game) {
      game = buildGame(0, 0);
      game.start();
    }
  }

  function escapeKeyMod(e) {
    if (e.code === "Escape") {
      closeNewGameDialog(null);
    }
  }

  openNewGameDialog(null);
})();
