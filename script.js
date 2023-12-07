let xWins = 0;
let circleWins = 0;
let draws = 0;

const elementosCelulas = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const restartMessage = document.querySelector("[data-restart-message-button]");
const mensagemVitoria = document.querySelector(".winning-message");
const mensagemVitoriaText = document.querySelector(".winning-message-text");
const ressetPlacar = document.querySelector("[resset-placar]");

//Definido para controlar qual jogador está
let isCircleTurn;

// Combinações possíveis
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const updateScoreboard = () => {
  const xWinsElement = document.querySelector(".x-wins");
  const circleWinsElement = document.querySelector(".circle-wins");
  const drawsElement = document.querySelector(".draws");

  xWinsElement.innerText = xWins;
  circleWinsElement.innerText = circleWins;
  drawsElement.innerText = draws;
};

// Chamada para iniciar um novo jogo
const startGame = () => {
  isCircleTurn = false;

  // Limpar toda as classes dos elementos
  for (const cell of elementosCelulas) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    // Aqui eu adiciono a o evento CLICK para todas as celulas lidar com esse evento uma única vez
    cell.addEventListener("click", handleClick, { once: true });
  }
  setBoardHoverClass();
  mensagemVitoria.classList.remove("show-winning-message");

  updateScoreboard();
};

const endGame = (isDraw) => {
  if (isDraw) {
    mensagemVitoriaText.innerText = "Empate!";
    draws++;
  } else {
    mensagemVitoriaText.innerText = isCircleTurn
      ? "Círculo Venceu!"
      : "X Venceu!";
    if (isCircleTurn) {
      circleWins++;
    } else {
      xWins++;
    }
  }
  mensagemVitoria.classList.add("show-winning-message");

  updateScoreboard();
};

// Checa se existe alguma combinação e retorna TRUE caso haja um vencedor
const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return elementosCelulas[index].classList.contains(currentPlayer);
    });
  });
};

// Verifica se todas as células são preenchidas e retorna um TRUE
const checkForDraw = () => {
  return [...elementosCelulas].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

// Adiciona a classe CSS para indicar se é X ou O a que jogou
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

// Essa função atualiza a classe da board para X ou circle
const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

// ALterna a vez dos jogadores para TRUE ou FALSE e chama a função setBoardHoverClass()
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

// Toda vez que o usuário clica nesta no tabuleiro é chamada esta função
// Coloca o símbolo correto, verifica se há uma combinação
// Atualiza a vez dos jogadores ou exibe a mensagem de vitória/empate
const handleClick = (e) => {
  // Colocar a marca (X ou Circulo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";
  placeMark(cell, classToAdd);

  // Verificar por vitoria
  const isWin = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar o simbolo
    swapTurns();
  }
};

startGame();

const ressetScore = () => {
  window.location.reload();
};

ressetPlacar.addEventListener("click", ressetScore);
restartMessage.addEventListener("click", startGame);
