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

// ブロック
const brickRowCount = 5;
const brickColumnCount = 8;

const brickWidth = 80;
const brickHeight = 25;
const brickPadding = 15;

const brickOffsetTop = 50;
const brickOffsetLeft = 35;

const bricks = [];

for(let c = 0; c < brickColumnCount; c++){

    bricks[c] = [];

    for(let r = 0; r < brickRowCount; r++){

        bricks[c][r] = {
            x:0,
            y:0,
            status:true
        };

    }

}



let gameOver = false;
   
let rightPressed = false;
let leftPressed = false;

window.addEventListener("keydown", (e) => {

    if (e.code === "ArrowRight") {
        rightPressed = true;
    }

    if (e.code === "ArrowLeft") {
        leftPressed = true;
    }

});

window.addEventListener("keyup", (e) => {

    if (e.code === "ArrowRight") {
        rightPressed = false;
    }

    if (e.code === "ArrowLeft") {
        leftPressed = false;
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

function drawBricks(){

    for(let c=0;c<brickColumnCount;c++){

        for(let r=0;r<brickRowCount;r++){

            if(bricks[c][r].status){

                const brickX =
                    brickOffsetLeft +
                    c * (brickWidth + brickPadding);

                const brickY =
                    brickOffsetTop +
                    r * (brickHeight + brickPadding);

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.fillStyle = "#38bdf8";

                ctx.fillRect(
                    brickX,
                    brickY,
                    brickWidth,
                    brickHeight
                );

            }

        }

    }

}

function draw(){

    ctx.fillStyle = "red";
ctx.fillRect(100,100,80,25);
    
     if(gameOver){
    return;
}
    
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBricks();
    
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
    ball.y + ball.radius < paddle.y + paddle.height &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
){

    ball.dy = -Math.abs(ball.dy);

}
    // 下に落ちた

if(ball.y > canvas.height && !gameOver){

    gameOver = true;

    alert("ゲームオーバー！");

    location.reload();

}
}

setInterval(draw,16);
