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

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", function(e){

    if(e.key === "ArrowRight"){
        rightPressed = true;
    }

    if(e.key === "ArrowLeft"){
        leftPressed = true;
    }

});

document.addEventListener("keydown", function(e){

    console.log(e.key);

    if(e.key === "ArrowRight"){
        rightPressed = true;
    }

    if(e.key === "ArrowLeft"){
        leftPressed = true;
    }

});


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

    let gameOver = false;
    if(gameOver){
    return;
}
    
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBall();

    drawPaddle();

    // バーを動かす

if(rightPressed && paddle.x < canvas.width - paddle.width){

    paddle.x += 7;

}

if(leftPressed && paddle.x > 0){

    paddle.x -= 7;

}
    
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
    // バーとの当たり判定

if(

    ball.y + ball.radius > paddle.y &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width

){

    ball.dy *= -1;

}
    // 下に落ちた

if(ball.y > canvas.height && !gameOver){

    gameOver = true;

    alert("ゲームオーバー！");

    location.reload();

}
}

setInterval(draw,16);
