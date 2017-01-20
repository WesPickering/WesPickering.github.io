var game = new Phaser.Game(860, 860, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var time = 0;
var speed = 75;

function preload() {
  game.load.image('blue', 'res/blue_block.png');
  game.load.image('red', 'res/red_block.png');
  game.load.image('white', 'res/White_square.png');
}

function create() {
  game.stage.backgroundColor = "black";
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //players
  player1 = game.add.group();
  player1.enableBody = true;
  createPlayer1(10, game.world.height - 200, 200, 400);

  player2 = game.add.group();
  player2.enableBody = true;
  createPlayer2()

  //controls
  cursors = game.input.keyboard.createCursorKeys();
  var move_left = game.input.keyboard.addKey(Phaser.Keyboard.A);
  var move_right = game.input.keyboard.addKey(Phaser.Keyboard.D);
  var move_up = game.input.keyboard.addKey(Phaser.Keyboard.W);
  var move_down = game.input.keyboard.addKey(Phaser.Keyboard.S);
  var shoot_1 = game.input.keyboard.addKey(Phaser.Keyboard.G);
  var shoot_2 = game.input.keyboard.addKey(Phaser.Keyboard.L);

}

function createPlayer1(x, y) {
  var p1 = player1.create(15, game.world.height / 2, 'red');
  p1.body.collideWorldBounds = true;
  p1.speed = speed;
}

function createPlayer2(x, y) {
  var p2 = player2.create(game.world.width - 15, game.world.height / 2, 'blue');
  p2.body.collideWorldBounds = true;
  p2.speed = speed;
}

  function update() {
    game.physics.arcade.collide(player1, player2);







}
