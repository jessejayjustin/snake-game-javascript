const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

let background = new Image();
background.src = 'img/original.png';


let coin = new Image();
coin.src = 'img/bitcoin3.png';


let bitcoin = new Image();
bitcoin.src = 'img/bitcoin2.png';


let dead = new Audio();
dead.src = 'audio/dead.mp3';

let eat = new Audio();
eat.src = 'audio/eat.mp3';


let box = 32;


let snake = [];
snake[0] = { 
	x: 9*box, 
	y: 13*box 
}

let snakeX = snake[0].x;
let snakeY = snake[0].y;

let food = {
	x: Math.floor(Math.random() * 19) * box,
	y: Math.floor(Math.random() * 17+2) * box
}

let score = 0;

let title = "Press spacebar to pause game";

let d;
document.addEventListener('keydown',direction);

function direction(event){
   
    if(event.keyCode == 37 && d!="RIGHT"){
   	  d = "LEFT";
    } else if (event.keyCode == 38 && d!="DOWN") {
      d = "UP"; 	
    } else if (event.keyCode == 39 && d!="LEFT") {
      d = "RIGHT";
    } else if (event.keyCode == 40 && d!="UP") {
      d = "DOWN";
    } else if (event.keyCode == 32) {
      d = "PAUSE";
    }
}

function draw(){
   
   ctx.drawImage(background,0,0);

    for(let i=0; i < snake.length; i++){

      ctx.fillStyle = (i == 0) ? 'maroon' : 'gold';
      ctx.fillRect(snake[i].x,snake[i].y,box,box);

    }

    ctx.drawImage(bitcoin,15,14);
    ctx.drawImage(coin,food.x,food.y);

    ctx.fillStyle = 'yellow';
    ctx.font = '45px Changa One';
    ctx.fillText(score,2*box,1.6*box);

    ctx.fillStyle = 'yellow';
    ctx.font = '30px Changa One';
    ctx.fillText(title,4*box,1.6*box);

    if(d == "LEFT") snakeX -= box;
	if(d == "RIGHT") snakeX +=box;
	if(d == "UP") snakeY -= box;
	if(d == "DOWN") snakeY += box;

	let newHead = {
	   x:snakeX,
	   y:snakeY
	}

    if(d == "PAUSE"){
        title = "Press any arrow key to start game";
    	for(let i = 0; i < snake.length; i++){
             newHead[0].x + snake[i].x
             newHead[0].y + snake[i].y 
        }
  
	} else {
        title = "Press spacebar to pause game";
	}

    if(newHead.x == food.x && newHead.y == food.y){

		score++
		food = {
		x: Math.floor(Math.random() * 19) * box,
		y: Math.floor(Math.random() * 17+2) * box
	    }
	    eat.play();

    } else {

        snake.pop();
    }


    function collision(newHead, snake){
       
        for(let i = 0; i < snake.length; i++){
          if(newHead.x == snake[i].x && newHead.y == snake[i].y){
         	return true;
          }  
        }
    }

    if(newHead.x < 1 - box || newHead.x > 18 * box || newHead.y < 2*box || newHead.y > 18*box || collision(newHead, snake)) {
    	dead.play();
    	clearInterval(game,100);
    	setTimeout(reload,300);

    	function reload(){
    	   window.location.reload();
    	}
    }

    snake.unshift(newHead);

}

let game = setInterval(draw,100);


