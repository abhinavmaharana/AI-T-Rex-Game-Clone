let unicorn;
let uImg;//bird image
let tImg;//obstacle image
let bImg;//background
let trains = [];
var score = 0;
let soundClassifier;


function preload(){
  // Options for the SpeechCommands18w model, the default probabilityThreshold is 0
  const options = { probabilityThreshold: 0.95 };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w',options);
  uImg = loadImage('bird.png');
  tImg = loadImage('equals.png');
  bImg = loadImage('skyBackground.png');
}

// function mousePressed(){
//   trains.push(new Train());
// }

function setup() {
  createCanvas(1000, 500);
  unicorn = new Unicorn();
  soundClassifier.classify(gotCommand);
}

function gotCommand(error, results){
  if(error){
    console.error(error);
  }
  console.log(results[0].label, results[0].confidence);
  if (results[0].label == 'up') {
    unicorn.jump();
  }

}
  
function draw() {
  if(random(1) < 0.005){
    trains.push(new Train());
  }
  background(bImg);
  // image(bImg, bX, 0, bImg.width, height);
  // if (bX <= -bImg.width + width) {
  //   image(bImg, bX + bImg.width, 0, bImg.width, height);
  //   if (bX <= -bImg.width) {
  //     bX = 0;
  //   }
  // }
  for (let t of trains){
    t.move();
    t.show(); 
    if (unicorn.hits(t)){
      console.log('game over');
      noLoop();
    }
  }
  unicorn.show();
  unicorn.move();
  
}

function keyPressed(){
  if (key == ' '){
    unicorn.jump();
    if (isOver) reset(); 
  }
} 

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}
