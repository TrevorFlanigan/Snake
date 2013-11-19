var my_canvas = document.getElementById("canvas");
var context=my_canvas.getContext("2d");
var w=my_canvas.offsetWidth;
var h=my_canvas.offsetHeight;
var cw=10;
var d;
var userInput=0;
var game_loop;
var snake=[];
var food;
var tail;
var score=0;
var nx;
var ny;
var speed;

function rainbowPower(){
	var letters="0123456789abcdef";
	letters=letters.split("");
	//set up a new variable called colour
	//colour starts with #
	//write a for loop which runs 6 times
	//inside the loop add a random letter to colour
	//after the loop, return colour
	//pass in colour into the paintcells function when score = 5.
	var colourNumb="#";
	for(var i=0;i<6;i++){
		colourNumb+=letters[Math.round(Math.random()*15)];
	}
	return colourNumb;
}
function paintCells(x,y,colour){
	if(score>=5){
		context.fillStyle=rainbowPower();
	}
	else{
		context.fillStyle=colour;
	}
	context.fillRect(x*cw,y*cw,cw,cw);
	context.strokeStyle="white";
	context.strokeRect(x*cw,y*cw,cw,cw);
}
function createFood(){
	food={
		x:Math.round(Math.random()*(w-cw)/cw),
		y:Math.round(Math.random()*(h-cw)/cw)
	}
	console.log(food.y+" <-- Y X--> "+food.x+ " " +food);
	if(checkCollision(food.x,food.y,snake)){
		createFood();
	}
}

function init(){
	speed=300;
	score=0;
	d="right";
	drawSnake();
	createFood();
	if(typeof game_loop!=="undefined"){
		clearInterval(game_loop);
	}
	game_loop=setInterval(paint,speed);

}
document.onkeydown=function(event){
	if(event.keyCode===39 && d!=="left"){
		d="right";
			}
	else if(event.keyCode===38 && d!=="down"){
		d="up";
	}
	else if(event.keyCode===37 && d!=="right"){
		d="left";
	}
	else if(event.keyCode===40 && d!=="up"){
		d="down";
	}
console.log(d);
}

function paint(){
	context.fillStyle="white";
	context.fillRect(0,0,w,h);
	context.strokeStyle="black";
	if(score>=5){
		context.strokeStyle=rainbowPower();
	}
	context.strokeRect(0,0,w,h);
	nx=snake[0].x;
	ny=snake[0].y;
	if(d==="right"){
		nx++;
	}
	else if(d==="left"){
		nx--;
	}
	else if(d==="up"){
		ny--;
	}
	else if(d==="down"){
		ny++;
	}
	if(nx===-1 || ny===-1 || nx===w/cw || ny===h/cw || checkCollision(nx,ny,snake)){
		console.log("U DIED");
		init();
		return;
	}
	if(snake[0].x===food.x&&snake[0].y===food.y){
		console.log("IT WORKS");
		createFood();
		score++;
		console.log(score);
		var newHead={x:nx,y:ny};
		snake.unshift(newHead);
		if(speed>50){
			clearInterval(game_loop);
			speed=speed-50;
			game_loop=setInterval(paint,speed);
			console.log(speed);
		}
//bob wasnt here
	}
	else{
		tail=snake.pop();
		tail.x=nx;
		tail.y=ny;
			snake.unshift(tail);
	}
	//console.log(tail);
	for(i=0;i<snake.length;i++){
		var c=snake[i];

		paintCells(c.x,c.y,"00ff00");

	}

	paintCells(food.x,food.y,"blue");
	context.font="15px Ariel";
	context.fillStyle="black";
	if(score>=5){
		paintCells(c.x,c.y,rainbowPower());
	}
	context.fillText("Score: "+score,5,h-5);


}

function drawSnake(){
	snake=[];
	var length=3;
	for(i=length-1;i>=0;i--){
		snake.push({x:15,y:15});
		//console.log(i);
	}
}
function checkCollision(x,y,array){
	for(var i=0;i<array.length;i++){
		if(array[i].x==x && array[i].y==y){
			console.log("TRUE");
			return true;
			
		}
//			console.log("x=" + x +" y="+ y);
//			console.log(array[i]);
			return false;
		}
		console.log(tail);
		console.log(food)
	}

		
		
init();
rainbowPower();

//console.log(snake);