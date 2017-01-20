var game = new Phaser.Game(860, 860, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var cursors;
var reload2 = 0;
var reload1 = 0;
var speed = 95;

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
  createPlayer1();

  player2 = game.add.group();
  player2.enableBody = true;
  createPlayer2();

  //bullets
  bullets1 = game.add.group();
  bullets1.enableBody = true;

  bullets2 = game.add.group();
  bullets2.enableBody = true;

  //controls
  up_arr = game.input.keyboard.addKey(38);
  left_arr = game.input.keyboard.addKey(37);
  right_arr = game.input.keyboard.addKey(39);
  down_arr = game.input.keyboard.addKey(40);
  move_left = game.input.keyboard.addKey(Phaser.Keyboard.A);
  move_right = game.input.keyboard.addKey(Phaser.Keyboard.D);
  move_up = game.input.keyboard.addKey(Phaser.Keyboard.W);
  move_down = game.input.keyboard.addKey(Phaser.Keyboard.S);
  shoot_1 = game.input.keyboard.addKey(Phaser.Keyboard.G);
  shoot_2 = game.input.keyboard.addKey(Phaser.Keyboard.L);

}

function createPlayer1() {
  var p1 = player1.create(15, game.world.height / 2, 'red');
  p1.body.collideWorldBounds = true;
  p1.speed = speed;
}

function createPlayer2() {
  var p2 = player2.create(game.world.width - 75, game.world.height / 2, 'blue');
  p2.body.collideWorldBounds = true;
  p2.speed = speed;
}

function shoot1(x, y, x_speed, y_speed) {
  if (x_speed != 0 && y_speed != 0) {
    var shot = bullets1.create(x + 25, y + 25, 'white');
    shot.body.velocity.x = x_speed * 1.8;
    shot.body.velocity.y = y_speed * 1.8;
  }
}

function shoot2(x, y, x_speed, y_speed) {
  if (x_speed != 0 && y_speed != 0) {
    var shot = bullets2.create(x + 25, y + 25, 'white');
    shot.body.velocity.x = x_speed * 1.8;
    shot.body.velocity.y = y_speed * 1.8;
  }


}

function update() {
    game.physics.arcade.collide(player1, player2);

    //Player 2 Controls
    player2.forEach(function(p2){
      //win condidtion
      if (game.physics.arcade.overlap(p2, bullets1)) {
        alert("Player 1 wins! reload to play again.");
        reset();
      }

      p2.body.velocity.x = 0;
      p2.body.velocity.y = 0;
      if (up_arr.isDown) {
        p2.body.velocity.y = -p2.speed;
      } if (down_arr.isDown) {
        p2.body.velocity.y = p2.speed;
      } if (left_arr.isDown) {
        p2.body.velocity.x = -p2.speed;
      } if (right_arr.isDown) {
        p2.body.velocity.x = p2.speed;
      }
      //shooting mech for 2
      if (reload1 == 20) {
        if (shoot_2.isDown) {
          shoot2(p2.x, p2.y, p2.body.velocity.x, p2.body.velocity.y);
          reload1 = 0;
        }
      } else {
        reload1 += 1;
      }
      });

      //Player 1 controls
      player1.forEach(function(p1){
        //win condidtion
        if (game.physics.arcade.overlap(p1, bullets2)) {
          alert("Player 2 wins! reload to play again.");
          reset();
        }

        p1.body.velocity.x = 0;
        p1.body.velocity.y = 0;
        if (move_up.isDown) {
          p1.body.velocity.y = -p1.speed;
        } if (move_down.isDown) {
          p1.body.velocity.y = p1.speed;
        } if (move_left.isDown) {
          p1.body.velocity.x = -p1.speed;
        } if (move_right.isDown) {
          p1.body.velocity.x = p1.speed;
        }
        //shooting mech for 1
        if (reload2 == 20) {
          if (shoot_1.isDown) {
            shoot1(p1.x, p1.y, p1.body.velocity.x, p1.body.velocity.y);
            reload2 = 0;
          }
        } else {
          reload2 += 1;
        }
        });










}
