var game = new Phaser.Game(1080, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('tux', 'res/tux.png');
}

function create() {
  players = game.add.group();
  createPlayer();
}

function createPlayer() {
  var player = players.create(0, 0, 'tux');
}

function update() {
}
