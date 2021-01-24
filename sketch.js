/*ma'am i submitted this in a bit of a hurry so there might be a few things missing and pls tell me 
if there is anyhting wrong*/

var dog,happyDog,database,foodS,foodStock;

var dogImg,happyDogImg;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  
  happyDogImg=loadImage("images/dogImg1.png"); //in images folder path s was missing

}

function setup() {
  createCanvas(500,500);

  dog=createSprite(250,300,27,27);
  dog.addImage("dog",dogImg); //add var names for images instead of the path
  dog.scale=0.3; //use scale to make image small

  // we dont need to create sprite for happydog as we are changing images in dog sprite only when we press up arrow key

  /*happyDog=createSprite(250,300,27,27);
  happyDog.addImage("happyDog",happyDogImg);//add var names for images instead of the path
  happyDog.scale=0.3;*/

  //assign firebase database to var database
  database=firebase.database();

  database.ref('/').update({
    food:20
  });
  
  //fetch foodstock from database you have createdusing following syntax
  //joshua has written it inside draw()
  foodStock=database.ref('food');
  foodStock.on("value",readStock); //"" was ended after readStock, write foodStock instead of foodStack
  
}


function draw() {  
  background(46, 139, 87);
  //console.log(mouseX,mouseY);
    drawSprites();
    if(keyWentDown(UP_ARROW)) { //k in keyWentDown should be in lowercase
      writeStock(foodS);
      dog.addImage("dog",happyDogImg);
      console.log("inside if:",foodS);
    }

  
  // use textSize(), fill(), stroke to display foodStock
  stroke("green");
  fill("white");
  textSize(15);
  text("Remaining Stock: "+foodS,20,20);
  text("Note: Press up arrow key to feed Drago Milk!",20,40);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    food:x //f will be in lowercase
  });

} //bracket was missing