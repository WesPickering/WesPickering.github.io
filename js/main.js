var game = new Phaser.Game(1080, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;

function preload() {
  game.load.image('tux', 'res/tux.png');
}

function create() {
  game.stage.backgroundColor = "#4488AA";
  game.physics.startSystem(Phaser.Physics.ARCADE);
  players = game.add.group();
  players.enableBody = true;
  
  cursors = game.input.keyboard.createCursorKeys();

  createPlayer(10, 10);
}

function createPlayer(x, y ) {
  var player = players.create(x, y, 'tux');
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds =  true;
}

function update() {
  game.physics.arcade.collide(players, players);
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
