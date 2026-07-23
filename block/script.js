const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ボール
const ball = {
    x: 400,
    y: 250,
    radius: 10,
    dx: 4,
    dy: -4
};

// バー
const paddle = {
    x: 330,
    y: 470,
    width: 140,
    height: 15
};

function drawBall(){

    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

    ctx.fillStyle = "#38bdf8";

    ctx.fill();

    ctx.closePath();

}

function drawPaddle(){

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        paddle.x,
        paddle.y,
        paddle.width,
        paddle.height
    );

}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBall();

    drawPaddle();

    // ボールを動かす
    ball.x += ball.dx;
    ball.y += ball.dy;

    // 左右の壁
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx *= -1;
    }

    // 上の壁
    if(ball.y - ball.radius < 0){
        ball.dy *= -1;
    }

}

setInterval(draw,16);
