var game = new Phaser.Game(1080, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('tux', 'res/tux.png');
}

function create() {
  game.stage.backgroundColor = "#4488AA";
  players = game.add.group();
  createPlayer(0, 0);
}

function createPlayer(x, y ) {
  var player = players.create(x, y, 'tux');
}

function update() {
}
