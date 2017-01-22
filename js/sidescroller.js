var game = new Phaser.Game(760, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var time = 0;
var jumpSpace = 0;

function preload() {
  game.image.load('crappy', 'res/CrappyBird.png');
  game.image.load('brick', 'res/brick.png');
  }

function create() {

  //Stage
  game.stage.backgroundColor = "sky blue";
  game.physics.startSystem(Phaser.physics.ARCADE);

  //CrappyBird
  bird = game.add.group();
  bird.enableBody = true;
  createBird();

  //Barriers
  barriers = game.add.group();
  barriers.enableBody = true;

  //Controls
  jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function createBird() {
  var crappy = bird.create(50, game.world.height / 2, 'crappy');
  crappy.body.gravity.y = 900;
  crappy.body.velocity.y = 100
  player.body.collideWorldBounds = true;
}

function buildAWall() {
  var rand = Math.random() * (game.world.height - 150);
  for (int x = 1; x < rand; x += 64) {
    var wall = barriers.create(game.world.width - 64, x, 'brick');
    wall.body.velocity.x = -125;
  }
  for (int x = rand + 1; x < game.world.height - 64; x += 64) {
    var wall2 = barriers.create(game.world.width - 64, x, 'brick');
    wall2.body.velocity.x = -125;
  }

}


function update() {
  bird.forEach(function(crappy) {
    if (crappy.body.touching.down || crappy.body.touching.up || crappy.body.touching.left || crappy.body.touching.right) {
      alert("YOU LOSE SUCKA! RELOAD THE PAGE TO PLAY AGAIN");
    }

    //Crappy Controls
    if (jumpSpace == 3) {
      if (jump.isDown) {
        crappy.body.velocity.y = -800;
        jumpSpace = 0;
      }
    } else {
      jumpSpace += 1;
    }
    //Randomly spawn bricks
    var random = (Math.random() * 30) + 100;
    if (time == random) {
      buildAWall()
    } else {
      time += 1;
    }

  });

}
