var game = new Phaser.Game(1080, 960, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var time = 0;

function preload() {
  game.load.image('tux', 'res/tux.png');
  game.load.image('hilfy', 'res/hilfinger.png');
  game.load.image('brick', 'res/brick.png');
  game.load.image('brick2', 'res/brick.png');
  game.load.image('flag', 'res/flag.png');
}

function create() {
  game.stage.backgroundColor = "#4488AA";
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //players
  players = game.add.group();
  players.enableBody = true;
  createPlayer(10, game.world.height - 200, 200, 400);

  //controls
  cursors = game.input.keyboard.createCursorKeys();

  //floor
  platforms = game.add.group();
  platforms.enableBody = true;
  createPlatform();

  bricks = game.add.group();
  bricks.enableBody = true;
  createBrickGoal();

  flags = game.add.group();
  flags.enableBody = true;
  createFlag()
}

function createFlag() {
  var flag = flags.create(game.world.width - 64, 150 - 64, 'flag');
  flag.body.immovable = true;
}

function createBrickGoal() {
  var goal = bricks.create(game.world.width - 64, 150, 'brick');
  goal.body.immovable = true;
}

function createPlayer(x, y, speed, jump) {
  var player = players.create(x, y, 'hilfy');
  player.body.gravity.y = 500;
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

function randomBrickBot() {
  var rand = Math.random() * ((game.world.height - 278) / 3);
  var rng = Math.random();
  if (rng > .5) {
    var randBrick = bricks.create(0, 2 * ((game.world.height - 278 / 3) + 150 + rand, 'brick'));
    randBrick.body.velocity.x = 150;
  } else {
    var randBrick = bricks.create(game.world.width - 64, 2 * ((game.world.height - 278) / 3) + 150 + rand, 'brick');
    randBrick.body.velocity.x = -150;
  }
  randBrick.body.immovable = true;

}

function randomBrickMid() {
  var rand = Math.random() * ((game.world.height - 278) / 3);
  var rng = Math.random();
  if (rng > .5) {
    var randBrick = bricks.create(0, ((game.world.height - 278) / 3) + 150 + rand, 'brick');
    randBrick.body.velocity.x = 150;
  } else {
    var randBrick = bricks.create(game.world.width - 64, ((game.world.height - 278) / 3) + 150 + rand, 'brick');
    randBrick.body.velocity.x = -150;
  }
  randBrick.body.immovable = true;
}


function randomBrickTop() {
  var rand = Math.random() * ((game.world.height - 278) / 3);
  var rng = Math.random();
  if (rng > .5) {
    var randBrick = bricks.create(0, 150 + rand, 'brick');
    randBrick.body.velocity.x = 150;
  } else {
    var randBrick = bricks.create(game.world.width - 64, 150 + rand, 'brick');
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
    if (time % 300 == 0){
      randomBrickTop();
      time = 0;
    }
    if (time % 100 == 0){
      randomBrickMid();
      time += 1;
    }
    if (time % 50 == 0){
      randomBrickBot();
      time += 1;
    } else {
      time += 1;
    }
  });
}
