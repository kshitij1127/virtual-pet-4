var dog, happydog, database, foodS, foodStock, dogimg, happydogimg, milkbottle, feed, addStock, foodObj, lastFed, fedTime
var PLAY = 1
var END = 0
var gameState = PLAY
function preload() {
  //load images here
  dogimg = loadImage("images/dogImg.png")
  happydogimg = loadImage("images/dogImg1.png")
}




function setup() {
  createCanvas(1000, 400)
  database = firebase.database();
  foodObj = new Food()
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)

  dog = createSprite(500, 200)
  dog.addImage(dogimg)
  dog.scale = 0.3



  feed = createButton("Feed The Dog")
  feed.position(700, 95)
  feed.mousePressed(feedDog)

  addStock = createButton("Add Food")
  addStock.position(800, 95)
  addStock.mousePressed(addFood)

}



function draw() {
  background(46, 139, 87)


  foodObj.display()


  fedTime = database.ref('FeedTime')
  fedTime.on("value", function (data) {
    lastFed = data.val();
  })



  if (lastFed >= 12) {
    fill(255);
    text("last feed : " + lastFed % 12 + "PM", 350, 30)
  } else if (lastFed == 0) {
    fill(255);
    text("last feed : 12AM", 350, 30)
  } else {
    fill(255);
    text("last feed : " + lastFed + "AM", 350, 30)
  }

  var currentTime = hour();
  if (currentTime === (lastFed + 1)) {
    update("Playing");
    foodObj.garden()
  } else if (currentTime === (lastFed + 2)) {
    update("Sleeping");
    foodObj.bedroom();
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("Bathing");
    foodObj.washroom();
  } else if (currentTime === (lastFed+4)) {
    update("Hungry");
    foodObj.display()
  }else if (currentTime === (lastFed+5)) {
    update("notHungry");
    foodObj.display()
  }

  console.log(gameState)


  stroke(0, 100, 255)
  strokeWeight(7)
  textSize(24)
  fill(255)
  text("food stock : " + foodS, 50, 50);

  readstate = database.ref('gameState')
  readstate.on("value", function (data) {
    gameState = data.val()
  })

  drawSprites();
  //add styles here

}


function feedDog() {
  dog.addImage(happydogimg)
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function readStock(data) {

  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}


function addFood() {
  dog.addImage(dogimg)
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}

function update(state) {
  database.ref('/').update({
    gameState: state
  })
}







