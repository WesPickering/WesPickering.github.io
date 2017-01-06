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
  createPlayer(10, 10);

  //controls
  cursors = game.input.keyboard.createCursorKeys();

  //floor
  platforms = game.add.group();
  platforms.enableBody = true;
  createPlatform();
}

function createPlayer(x, y) {
  var player = players.create(x, y, 'tux');
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds =  true;
}

function createPlatform() {
  for(var i = 0; i < game.world.width; i += 64) {
    var ground = platforms.create(i, game.world.height, 'brick');
    ground.body.immovable = true;
  }
}

function update() {
  game.physics.arcade.collide(players, players);
  game.physics.arcade.collide(players, platforms);
  game.physics.arcade
  players.forEach(function(p){
    p.body.velocity.x = 0;
    if(cursors.left.isDown) {
      p.body.velocity.x = -150;
    }
    else if(cursors.right.isDown) {
      p.body.velocity.x = 150;
    }
  });
}
