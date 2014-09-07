MainState = { };

MainState.Boot = function(game){};
MainState.Preloader = function(game){};
MainState.Gameplay = function(game){};


MainState.Boot.prototype = {

	//preloadBar: Phaser.Sprite,

	preload: function() {
		//this.load.image('preloadBar', 'assets/sprites/preloadBar.png');
	},

	create: function() {
		game.state.start('preload');
	},

	update: function() {

	}

};

MainState.Preloader.prototype = {

	preload: function() {

		inputHandler.preload();

		level.preload();
	    overlay.preload();
	},

	create: function() {
		//game.stage.smoothed = false;
		game.state.start('gameplay');
		
	},

	update: function() {

	}

};


MainState.Gameplay.prototype = {


	create: function() {

		console.log('gameplay started');
		inputHandler.create();
		level.create();
	    overlay.create();

	},

	update: function() {
		inputHandler.update();
		level.update();
	    overlay.update();
	},

	render: function() {

		// game.debug.quadTree(game.physics.arcade.quadTree);

		//game.debug.text("Difficulty: " + difficulty, 500, 100);
		//game.debug.text("Difficulty stage: " + difficultyStage, 500, 130);
		//game.debug.text("coins this round: " + coinsCollectedThisRound, 200, 100);
		
		// game.debug.text("dead?: " + lifeEmpty, 200, 100);
		// game.debug.soundInfo(currentSong, 20, 32);
		// bullets.forEachAlive(function(bullet){game.debug.body(bullet);});
	 //    game.debug.text("Current Combo: " + currentCombo, 300, 300);
	 //    game.debug.text("Max Combo: " + maxCombo, 300, 332);
	 //    game.debug.text("Current Mode: " + modeString, 32, 32);
	 //    game.debug.text("Current Time: " + (currentTimeCountdown), 32, 64);
	 //    game.debug.text("Score: " + score, 600, 64);
	 //    game.debug.text("High Score: " + highestScore, 600, 96);
	    //game.debug.text("health:" + playerHealth, playerSprite.x, playerSprite.y - 10);

	    game.time.advancedTiming = true;
	    //game.debug.text("fps: " + game.time.fps, 600, 32);
	},

	shutdown: function() {

		// console.log('destroyed game stuff');
	}

};