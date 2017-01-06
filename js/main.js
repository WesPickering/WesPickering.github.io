var game = new Phaser.Game(1080, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;

function preload() {
  game.load.image('tux', 'res/tux.png');
  game.load.image('brick', 'res/brick.png');
}

function create() {
  game.stage.backgroundColor = "#4488AA";
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //players
  players = game.add.group();
  players.enableBody = true;
  createPlayer(10, 10, 500, 500);

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
}

function createBricks() {
  for(var i = 0; i < 3; i+= 1){
    var brick = bricks.create(game.world.width - 64, game.world.height - 64 - i*64, 'brick');
    brick.body.gravity.x = -100;
    brick.body.immovable = true;
  }
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
  });
}
