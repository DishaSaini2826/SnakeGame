let inputDir ={x: 0, y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.wav');
const moveSound = new Audio('move.mp3');
let  speed =5;
let score = 0;
let lastpaintTime =0;
let snakeArr= [{x: 13, y: 15 }];
food = { x: 6, y: 7};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
}
function isCollide(sarr){
   for (let i = 1; i < snakeArr.length; i++) {
    if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
     return true;
    }
    }
    if(snakeArr[0].x >=18 || snakeArr[0].x<=0 || snakeArr[0].y >=18 || snakeArr[0].y <=0){
       return true;
    }
}
function gameEngine(){
    // updating snake & food 
    if(isCollide(snakeArr)){
       gameOverSound.play();
        inputDir ={x:0 , y: 0};
        document.getElementById('finalScore').innerText = score; 
        document.getElementById('gameOverMessage').style.display = 'block'; 
        //alert("Game over . Press any key to play again!");
       // snakeArr=[{x: 13, y:15 }]; 
        //score = 0;
    return;
    }

     //if u have eaten food , increment the score and regenerate thhe food 
     if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
       foodSound.play();
        score += 1;
        scoreBox.innerHTML= "score :"+ score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a= 2 ;
        let b=  16 ;
        food ={x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random()) };
     }

     // moving the snake
     for(let i = snakeArr.length - 2; i >=0; i--) {
        snakeArr[i+1]= {...snakeArr[i]}; 
     }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    
    //dispaly the snake 
    board.innerHTML= "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
        snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the food 
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}
function resetGame() {
    score = 0; // Reset score
    snakeArr = [{ x: 13, y: 15 }]; // Reset snake position
    inputDir = { x: 0, y: 0 }; // Reset direction
    document.getElementById('gameOverMessage').style.display = 'none'; // Hide game over message
    scoreBox.innerHTML = "score: " + score; // Update score display
    gameOver = false; // Reset game over state
    window.requestAnimationFrame(main); // Restart the game loop
}

// Add event listener for the restart button
document.getElementById('restartButton').addEventListener('click', resetGame);

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = { x:0, y: 1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
                 console.log("ArrowUp");
                inputDir.x =  0;
                inputDir.y =  -1;
        break;
        case "ArrowDown":
                 console.log("ArrowDown");
                 inputDir.x =  0;
                inputDir.y =   1;
        break;
        case "ArrowLeft":
                 console.log("ArrowLeft");
                 inputDir.x =  -1;
                inputDir.y =   0;
        break;
        case "ArrowRight":
                 console.log("ArrowRight");
                 inputDir.x =  1;
                inputDir.y =   0;
        break;
    }
});


