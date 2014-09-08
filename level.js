MainState.Level = function(game) {
};

var currentAnimal, breeder, jail, animals, babies;
var scoreText, animalsBreedingText;
var score = 0;
var animalsBreeding = 0;
var babyEvent, countdown;
var timeLeft = 61;
var lastBabyTime = 0;

MainState.Level.prototype = {

	preload: function() {
		game.load.spritesheet('animals', 'assets/animals.png', 32, 32);
		game.load.image('breeder', 'assets/breeder.png');
		game.load.image('jail', 'assets/jail.png');
	},

	create: function() {

		animals = game.add.group();
		animals.enableBody = true;
		animals.physicsBodyType = Phaser.Physics.ARCADE;
		animals.createMultiple(10, 'animals', 0);
		animals.forEach(function(animal){
			animal.inputEnabled = true;
			animal.species = game.rnd.integerInRange(0, 3);
			animal.frame = animal.species;
		}, this);

		babies = game.add.group();
		babies.enableBody = true;
		babies.physicsBodyType = Phaser.Physics.ARCADE;
		babies.createMultiple(200, 'animals', 0);
		babies.forEach(function(baby){
			baby.inputEnabled = true;
			baby.species = game.rnd.integerInRange(0, 3);
			baby.frame = baby.species;
			baby.scale.setTo(0.5, 0.5);
		}, this);
		
		breeder = game.add.sprite(100, 100, 'breeder');
		jail = game.add.sprite(game.width - 356, 100, 'jail');

		spawnAnimal();

		scoreText = game.add.text(20, 10, "Score: 0", {
			font: "40px Indie ASDF Flower",
			align: "center",
			fill: "#fff",
		});

		animalsBreedingText = game.add.text(breeder.x, breeder.y, "# animals: 0", {
			font: "30px Indie ASDF Flower",
			align: "center",
			fill: "#fff",
		});

		timeText = game.add.text(game.width - 260, 10, "Time Left: 60", {
			font: "40px Indie ASDF Flower",
			align: "center",
			fill: "#fff",
		});


		lastBabyTime = game.time.now;
		babyEvent = game.time.events.loop(20, spawnBabiesIfPossible);

		countDown = game.time.events.loop(100, countDownTime);

	},

	update: function() {
		
	}

};

function countDownTime(){
	timeLeft -= .1;
	timeText.text = "Time Left: " + game.math.floor(timeLeft);
	if(timeLeft <= 0){
		game.state.start('menu_gameover');
	}
}

function addScore(value){
	score += value;
	scoreText.text = "Score: " + score;
}

function addAnimalsBreeding(value){
	if(animalsBreeding + value >= 0)
		animalsBreeding += value;
	else 
		animalsBreeding = 0;
	animalsBreedingText.text = "# animals: " + animalsBreeding;
}

function spawnBabiesIfPossible(){
	if(animalsBreeding > 1 && game.time.now - lastBabyTime > 5000 - game.math.floor(animalsBreeding / 2) * 200){
		lastBabyTime = game.time.now;
		spawnBaby();
	}
}

function spawnBaby() {
	var baby = babies.cursor;
	babies.next();

	if(baby){
		baby.reset(breeder.x + breeder.width / 2 - baby.width / 2, breeder.y + breeder.height - 64);
		baby.body.velocity.y = 150;
		baby.body.velocity.x = game.rnd.integerInRange(-100, 100);
		addScore(100);
	}
}

function spawnAnimal(){
	var animal = animals.cursor;
	animals.next();

	if(animal){ 
		animal.isCriminal = (game.rnd.integerInRange(0,1) == 1);

		if(animal.isCriminal){
			animal.frame = game.rnd.integerInRange(4, 7);
		} else {
			animal.frame = game.rnd.integerInRange(0, 3);
		}
		animal.reset(game.width / 2 - animal.width / 2, -100);
		currentAnimal = animal;
		tempTweenTwo = game.add.tween(animal).to( { y: 100 }, 100, Phaser.Easing.Linear.None, true);
		
		
	}
}

function sendToBreeder(){
	if(currentAnimal){ 
		tempAnimal = currentAnimal;
		spawnAnimal();

		tempTween = game.add.tween(tempAnimal).to( { x: breeder.x + 64, y: breeder.y + 64 }, 400, Phaser.Easing.Linear.None, true);
		tempTween.onComplete.add(function(){

			if(tempAnimal.isCriminal){
				addAnimalsBreeding(-game.rnd.integerInRange(3,5));
			} else {
				addAnimalsBreeding(1);
			}

			//scoreText.text = "Score: " + score;

			tempAnimal.kill();
			//alert();
		});
		
		
	}
}

function sendToJail(){
	if(currentAnimal){ 
		tempAnimal = currentAnimal;
		spawnAnimal();

		tempTween = game.add.tween(tempAnimal).to( { x: jail.x + 128, y: jail.y + 64 }, 400, Phaser.Easing.Linear.None, true);
		tempTween.onComplete.add(function(){

			if(!tempAnimal.isCriminal){
			} else {
			}

			//scoreText.text = "Score: " + score;
			
			tempAnimal.kill();			//alert();
		});
	}
}
