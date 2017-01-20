var game = new Phaser.Game(860, 860, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var time = 0;

function preload() {
  game.load.image('tux', 'res/tux.png');
  game.load.image('brick', 'res/brick.png');
  game.load.image('brick2', 'res/brick.png');
  game.load.image('flag', 'res/flag.png');
}

function create() {
  game.stage.backgroundColor = "black";
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //players
  players = game.add.group();
  players.enableBody = true;
  createPlayer(10, game.world.height - 200, 200, 400);

  //controls
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
}
