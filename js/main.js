var game = new Phaser.Game(1080, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var time = 0;

function preload() {
  game.load.image('tux', 'res/tux.png');
  game.load.image('brick', 'res/brick.png');
  game.load.image('brick2', 'res/brick.png');
}

function create() {
  game.stage.backgroundColor = "#4488AA";
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //players
  players = game.add.group();
  players.enableBody = true;
  createPlayer(10, 10, 100, 300);

  //controls
  cursors = game.input.keyboard.createCursorKeys();

  //floor
  platforms = game.add.group();
  platforms.enableBody = true;
  createPlatform();

  bricks = game.add.group();
  bricks.enableBody = true;
  createBricks();
}

function createPlayer(x, y, speed, jump) {
  var player = players.create(x, y, 'tux');
  player.body.gravity.y = 300;
  player.body.collideWorldBounds =  true;
  player.speed = speed;
  player.jump = jump;
}

function createPlatform() {
  for(var i = 0; i < game.world.width; i += 64) {
    var ground = platforms.create(i, game.world.height - 64, 'brick');
    ground.body.immovable = true;
  }
  var ground = platforms.create(game.world.width - 64);
  ground.body.immovable = true;
}

// function createBricks() {
//   for(var i = 0; i < 3; i+= 1){
//     var brick = bricks.create(game.world.width - 64, game.world.height - 64 - i*64, 'brick2');
//     brick.body.velocity.x = -100;
//     brick.body.immovable = true;
//   }
// }

function randomBrick() {
  var rand = Math.random() * (game.world.height - 64);
  var rng = Math.random();
  if (rng > .5) {
    var randBrick = bricks.create(0, rand, 'brick');
    randBrick.body.velocity.x = 150;
  } else {
    var randBrick = bricks.create(game.world.width - 128, rand, 'brick');
    randBrick.body.velocity.x = -150;
  }
  randBrick.body.immovable = true;

}

function update() {
  game.physics.arcade.collide(players, players);
  game.physics.arcade.collide(players, platforms);
  game.physics.arcade.collide(players, bricks);
  players.forEach(function(p){
    p.body.velocity.x = 0;
    if(cursors.left.isDown) {
      p.body.velocity.x = -p.speed;
    } else if(cursors.right.isDown) {
      p.body.velocity.x = p.speed;
    }

    //jump controls
    if(cursors.up.isDown && p.body.touching.down) {
      p.body.velocity.y = -p.jump;
    }

    //generate bricks at intervals
    if (time == 100){
      randomBrick();
      time = 0;
    } else {
    time += 1;
    }
  });
}
