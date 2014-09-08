MainState.Menus = {};

MainState.Menus.Main = function(game) {
};

MainState.Menus.Gameover = function(game) {
};

var startBtn, k_start;

MainState.Menus.Main.prototype = {

	preload: function() {
		game.load.image('start', 'assets/start.png');
	},

	create: function() {

		startBtn = game.add.sprite(game.width / 2 - 100, game.height / 2 - 50, 'start');
		startBtn.inputEnabled = true;
		startBtn.events.onInputDown.add(startGame);

		k_start = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		k_start.onDown.add(startGame);
		

	},

	update: function() {
			

	}

};

var gameoverText;

MainState.Menus.Gameover.prototype = {

	preload: function() {

	},

	create: function() {

		gameoverText = game.add.text(0, 10, "GAME OVER, score: " + score, {
			font: "40px Indie ASDF Flower",
			align: "center",
			fill: "#fff",
		});

	},

	update: function() {
			

	}

};

function startGame(){
	//console.log('go');
	game.state.start('gameplay');
}
