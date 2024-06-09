const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 10, paddleHeight = 100, ballRadius = 10;
const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };
const cpu = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 2 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 3, dy: 3, radius: ballRadius };

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') player.dy = -5;
    else if (e.key === 'ArrowDown') player.dy = 5;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player.dy = 0;
});

function update() {
    player.y += player.dy;
    player.y = Math.max(Math.min(player.y, canvas.height - player.height), 0);

    cpu.y += cpu.dy;
    if (cpu.y < 0 || cpu.y > canvas.height - cpu.height) {
        cpu.dy *= -1;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < 0 || ball.y > canvas.height - ball.radius) {
        ball.dy *= -1;
    }

    if (ball.x < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
        ball.dx *= -1;
    }

    if (ball.x > cpu.x - ball.radius && ball.y > cpu.y && ball.y < cpu.y + cpu.height) {
        ball.dx *= -1;
    }

    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#fff';
    context.fillRect(player.x, player.y, player.width, player.height);
    context.fillRect(cpu.x, cpu.y, cpu.width, cpu.height);

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
