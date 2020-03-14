const canvas = document.getElementById('snake');
const start = document.getElementById('start');
const context = canvas.getContext('2d');
const box = 32;

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = 'right';

function criarBg() {
    context.fillStyle = '#538cc6';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
    for (i=0; i < snake.length; i++) {
        context.fillStyle = "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function Color() {
    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawFood() {
    context.fillStyle = Color();
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode === 37 && event.keyCode !== 'right') direction = 'left';
    if(event.keyCode === 38 && event.keyCode !== 'down') direction = 'up';
    if(event.keyCode === 39 && event.keyCode !== 'left') direction = 'right';
    if(event.keyCode === 40 && event.keyCode !== 'up') direction = 'down';

    if(event.keyCode === 13) resetGame(); //enter para resetar

}

function iniciarJogo() {
    if(snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            
            clearInterval(jogo);
            stopGame();

        } 
    }
    
    criarBg();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == 'left') snakeX -= box; 
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box; 

    if (snakeX !== food.x || snakeY !== food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    const newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}
function resetGame() {
    window.location.reload();
}

let jogo = setInterval(iniciarJogo, 100);

start.onclick = () => {
    resetGame();
}

function stopGame(){
    const div = document.getElementById('conteiner');
    const canvas = document.getElementById('snake');
    var novo = document.createElement('div');
    var text = document.createElement('p');
    text.innerHTML = 'You lost! :('
 
    novo.appendChild(text);
    div.removeChild(canvas);

    novo.setAttribute('id', 'novo');
    div.appendChild(novo);

    start.innerText = "START";
}
