var game = new Phaser.Game(760, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var time = 0;
var jumpSpace = 0;

function preload() {
  game.load.image('crappy', 'res/CrappyBird.png');
  game.load.image('brick', 'res/brick.png');

  }

function create() {

  //Stage
  game.stage.backgroundColor = "#00BFFF";
  game.physics.startSystem(Phaser.Physics.ARCADE);

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
  crappy.body.collideWorldBounds = true;
}

function buildAWall() {
  var rand = Math.random() * (game.world.height - 150);
  for (var x = 0; x < rand; x = x + 64){
    var wall = barriers.create(game.world.width - 64, x, 'brick');
    wall.body.velocity.x = -125;
  }
  for (var y = rand + 150; y < game.world.height - 64; y += 64) {
    var wall2 = barriers.create(game.world.width - 64, y, 'brick');
    wall2.body.velocity.x = -125;
  }

}


function update() {
  game.physics.arcade.collide(bird, barriers);
  bird.forEach(function(crappy) {
    if (crappy.body.touching.down || crappy.body.touching.up || crappy.body.touching.left || crappy.body.touching.right) {
      alert("YOU LOSE SUCKA! RELOAD THE PAGE TO PLAY AGAIN");
    }

    //Crappy Controls
    if (jumpSpace == 6) {
      if (jump.isDown) {
        crappy.body.velocity.y = -400;
        jumpSpace = 0;
      }
    } else {
      jumpSpace += 1;
    }
    //Randomly spawn bricks
    var random = (Math.random() * 30) + 100;
    if (time == 125) {
      buildAWall();
      time = 0;
    } else {
      time += 1;
    }

  });

}
