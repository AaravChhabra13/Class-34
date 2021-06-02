var ball;
var database,position;

function setup(){
    createCanvas(500,500);
    database=firebase.database()//we are linking it to firebase databse from index
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var child=database.ref("Ball/Position");//child is refering to the ball position of the databse
    child.on("value",readpos,showerror)
    //on is reading the position from database, value is having x and y, it will be passed to readpos, if readpos will fail then showerror will run
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
   /* ball.x = ball.x + x;
    ball.y = ball.y + y;
    */
   database.ref("Ball/Position").set({
       "x":position.x+x,
       "y":position.y+y
   });
}

function readpos(data){
position=data.val();//extract the value of x and y and will give it to position
ball.x=position.x;
ball.y=position.y;
}

function showerror(){
    console.log("ERROR ERROR ERROR ERROR");
}