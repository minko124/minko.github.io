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

        const colors = [
    "#ef4444", // 赤
    "#f97316", // オレンジ
    "#eab308", // 黄色
    "#22c55e", // 緑
    "#3b82f6"  // 青
];

bricks[c][r] = {
    x: 0,
    y: 0,
    status: true,
    alpha: 1,
    color: colors[r]
};

    }

}


//変数定義
let gameOver = false;
let gameStart = false;
let score = 0;  
// ブロックの総数
const maxScore = brickRowCount * brickColumnCount;

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

window.addEventListener("keydown",(e)=>{

    if(gameOver && e.code === "Enter"){

        location.reload();

    }

});

window.addEventListener("keydown", (e) => {

    if (e.code === "Enter") {

        if (!gameStart) {

            gameStart = true;

        } else if (gameOver) {

            location.reload();

        }

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

function drawScore(){

    ctx.font = "24px sans-serif";

    ctx.fillStyle = "#ffffff";

    ctx.fillText("Score : " + score, 20, 30);

}

function drawBricks(){

    for(let c=0;c<brickColumnCount;c++){

        for(let r=0;r<brickRowCount;r++){

            const b = bricks[c][r];
            if(b.status !== false){

                const brickX =
                    brickOffsetLeft +
                    c * (brickWidth + brickPadding);

                const brickY =
                    brickOffsetTop +
                    r * (brickHeight + brickPadding);

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.save();

ctx.globalAlpha = b.alpha;
ctx.fillStyle = b.color;

ctx.fillRect(
    brickX,
    brickY,
    brickWidth,
    brickHeight
);

ctx.restore();

                ctx.fillRect(
                    brickX,
                    brickY,
                    brickWidth,
                    brickHeight
                );

                //ブロックが少しずつ消える処理
                if(b.status === "breaking"){

    b.alpha -= 0.08;

    if(b.alpha <= 0){

        b.status = false;

    }

}

            }

        }

    }

　　}

function collisionDetection(){

    for(let c = 0; c < brickColumnCount; c++){

        for(let r = 0; r < brickRowCount; r++){

            const b = bricks[c][r];

            if(b.status === true){
                if(

                    ball.x > b.x &&
                    ball.x < b.x + brickWidth &&
                    ball.y > b.y &&
                    ball.y < b.y + brickHeight

                ){

                    ball.dy *= -1;

                    b.status = "breaking";
                    score++;
                    if(score === maxScore){

    gameOver = true;

    draw();

    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "60px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText("🎉 YOU WIN! 🎉",400,220);

    ctx.font = "30px sans-serif";
    ctx.fillText("Enterキーでリスタート",400,300);

}
                }

            }

        }

    }

　}

function draw(){

     if(!gameStart){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#ffffff";

    ctx.textAlign="center";

    ctx.font="60px sans-serif";
    ctx.fillText("BLOCK BREAKER",400,180);

    ctx.font="30px sans-serif";
    ctx.fillText("Enterキーでスタート",400,270);

    return;

}
     if(gameOver){
    return;
}
    
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBricks();

    collisionDetection();
    
    drawBall();

    drawPaddle();

    drawScore();
    
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
