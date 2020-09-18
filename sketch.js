//Create variables here
var dogimg, dog, happyDog, sadDog;
var database;
var foodS, foodStock, food;
var food1;
var gameState = "Hungry";
var feed, addFood;
var fedTime, lastFed;
var readState, changeState;
var bedroom, garden, washroom;
function preload()
{
  //load images here
  dogimg = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');
  sadDog = loadImage('image/Lazy.png')
  bedroom = loadImage('image/Bed Room.png');
  garden = loadImage('image/Garden.png');
  washroom = loadImage('image/Wash Room.png')
}

function setup() {
  database = firebase.database();
  createCanvas(800, 500);
  
  dog = createSprite(600, 250, 10, 10);
  dog.addImage(dogimg) 
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  food1 = new Food();

  feed = createButton("feed");
  feed.position(550,450);
  feed.mousePressed(feedDog);

  addFood = createButton("add Food");
  addFood.position(600, 450);
  addFood.mousePressed(addF);

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  })
}


function draw() {  
  background(46, 139, 87);
  
  food1.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  if(gameState !== "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog)
  }
  currentTime = hour();
  if(currentTime ===(lastFed+1)){
    update("Playing")
    food1.garden();
  }else if(currentTime ===(lastFed+2)){
    update("Sleeping");
    food1.bedroom();
  }else if(currentTime ===(lastFed+2) && currentTime <= (lastFed+4)){
    update("Bathing");
    food1.washroom();
  }else {
    update("Hungry");
    food1.display();
  }

  drawSprites();
  //add styles here
  textSize(15);
  stroke("black");
  fill("white");
  text("Food remaining: "+foodS, 550, 120);
}

function readStock(data){
foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function addF(){
 foodS++;
 database.ref('/').update({
   foodStock:foodS
 })
 console.log(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  writeStock(foodS);

  food1.updateFoodStock(food1.getFoodStock()-1);
  database.ref('/').update({
    Food:food1.getFoodStock(),
    FeedTime:hour()
  })
}

function update(state){
  database.ref('/').update({
    gmaeState: state
  });
}

