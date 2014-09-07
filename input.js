MainState.Input = function(game) {
};

var k_left, k_right;

MainState.Input.prototype = {

	preload: function() {
		
	},

	create: function() {
		k_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		k_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		k_left.onDown.add(sendToBreeder);
		k_right.onDown.add(sendToJail);

	},

	update: function() {
			

	}

};

