const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreElement = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Game State
let isActive = false;
let score = 0;
let frames = 0;
let animationId;

// Player
const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    color: '#00ff88',
    speed: 7,
    dx: 0
};

// Obstacles
let obstacles = [];
const obstacleSpeed = 4;
const obstacleFrequency = 50; // frames

// Input Handling
const keys = {
    ArrowRight: false,
    ArrowLeft: false
};

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') keys.ArrowRight = true;
    if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
    if (e.code === 'Space' && !isActive && startScreen.classList.contains('active')) {
        startGame();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') keys.ArrowRight = false;
    if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
});

restartBtn.addEventListener('click', startGame);
startScreen.addEventListener('click', startGame);

function startGame() {
    if (isActive) return;

    // Reset state
    isActive = true;
    score = 0;
    frames = 0;
    obstacles = [];
    player.x = canvas.width / 2 - 20;
    scoreElement.textContent = `Score: ${score}`;

    // UI
    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    gameOverScreen.classList.remove('active');
    gameOverScreen.classList.add('hidden');

    animate();
}

function gameOver() {
    isActive = false;
    cancelAnimationFrame(animationId);

    // UI
    gameOverScreen.classList.remove('hidden');
    gameOverScreen.classList.add('active');
    finalScoreElement.textContent = `Final Score: ${score}`;
}

function createObstacle() {
    const size = Math.random() * 30 + 30; // Random size 30-60
    obstacles.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        color: '#ff0055'
    });
}

function update() {
    // Player Movement
    if (keys.ArrowRight && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }

    // Obstacle Logic
    if (frames % obstacleFrequency === 0) {
        createObstacle();
    }

    obstacles.forEach((obs, index) => {
        obs.y += obstacleSpeed + (score * 0.001); // Slowly increase speed

        // Removal
        if (obs.y > canvas.height) {
            obstacles.splice(index, 1);
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
        }

        // Collision
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            gameOver();
        }
    });

    frames++;
}

function draw() {
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 0;

    // Obstacles
    obstacles.forEach(obs => {
        ctx.fillStyle = obs.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.shadowBlur = 0;
    });
}

function animate() {
    if (!isActive) return;

    update();
    draw();
    animationId = requestAnimationFrame(animate);
}

// Initial Draw
draw();
