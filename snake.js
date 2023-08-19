// Elementos de la interfaz gráfica
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreTag = document.getElementById("score");
const maxScoreTag = document.getElementById("max-score");
const play = document.getElementById("play");

// Variables iniciales del juego
let score = 0;
let maxScore = [];
let direction = "right";
let gameOver = false;
// Determina el tamaño inicial del snake
let snake = [
  { x: 10, y: 10 },
  { x: 20, y: 10 },
  { x: 30, y: 10 },
  { x: 40, y: 10 },
  { x: 50, y: 10 },
];
// Posición aleatoria para el punto
let point = {
  x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
  y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
};

// Función para dibujar el snake
function drawSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
}

// Verifica si el snake colisiona con sigo misma
function selfCollision(x, y) {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === x && snake[i].y === y) {
      return true;
    }
  }
  return false; 
}


// Función para mover el snake
function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  // Detecta la dirección de movimiento
  if (direction === "right") {
    head.x += 10;
  } else if (direction === "left") {
    head.x -= 10;
  } else if (direction === "up") {
    head.y -= 10;
  } else if (direction === "down") {
    head.y += 10;
  }

  // Detecta la colisión del snake
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    selfCollision(head.x, head.y)
  ) {
    maxScore.push(score);
    maxScoreTag.innerText = Math.max(...maxScore);
    gameOver = true;
    return;
  }

  // Aumenta el tamaño del snake por cada punto
  snake.unshift(head);
  if (head.x === point.x && head.y === point.y) {
    point = {
      x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
      y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
    };
    score++;
  } else {
    snake.pop();
  }
}

// Dibuja el punto
function drawPoint() {
  ctx.fillStyle = "red";
  ctx.fillRect(point.x, point.y, 10, 10);
}

// Actualiza el score en pantalla
function drawScore() {
  scoreTag.innerText = score;
}

// Función para poner en marcha el juego
function gameLoop() {
  // Detiene el juego si el snake colisiona contra los bordes
  if (gameOver) {
    return;
  } else {
    drawSnake();
    moveSnake();
    drawPoint();
    drawScore();
  }

  // Aumenta la velocidad del snake de acuerdo al score
  if (score <= 10) {
    setTimeout(gameLoop, 100);
  } else if (score > 10 && score <= 20) {
    setTimeout(gameLoop, 80);
  } else if (score > 20 && score <= 40) {
    setTimeout(gameLoop, 70);
  } else if (score > 40 && score <= 60) {
    setTimeout(gameLoop, 60);
  } else if (score > 60) {
    setTimeout(gameLoop, 50);
  }
}

// Detecta las flechas presionadas y establece dirección
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
});

// Botón de play
play.addEventListener("click", () => {
  // Se reinicia a las variables iniciales del juego
  score = 0;
  direction = "right";
  gameOver = false;
  snake = [
    { x: 10, y: 10 },
    { x: 20, y: 10 },
    { x: 30, y: 10 },
    { x: 40, y: 10 },
    { x: 50, y: 10 },
  ];
  // Se ejecuta de nuevo el juego
  gameLoop();
});
