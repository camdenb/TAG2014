var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('animals', 'assets/animals.png', 32, 32);
	game.load.spritesheet('cage', 'assets/cage.png', 128, 128);
}

function create() {
	var numCages = 4;
	cages = game.add.group();
	cages.enableBody = true;
	cages.physicsBodyType = Phaser.Physics.ARCADE;

	for(var i = 0; i < numCages; i++){
		var cage = cages.create(25 + i * 200, 100, 'cage');
		cage.frame = i;
	}

	cageScore = this.game.add.text(100, 50, "arial");
	cageScoreValue = 0;
	cageScore.text = cageScoreValue;
	cageScore.fill = 'red';

	game.input.onUp.add(function(){
		animals.forEachAlive(checkIfOverCage, this);
	}, this);

	animals = game.add.group();
	animals.enableBody = true;
	animals.physicsBodyType = Phaser.Physics.ARCADE;
	animals.createMultiple(100, 'animals', 0);
	animals.forEach(function(animal){
		animal.captured = false;
		animal.inputEnabled = true;
		animal.input.enableDrag(true);
		animal.animations.add('species', [0,1,2,3], 1, true);
		animal.species = game.rnd.integerInRange(0, 3);
		animal.frame = animal.species;
	}, this);

	spawnAnimal();

}

function update() {
	

}

function spawnAnimal() {
	var animal = animals.getFirstExists(false);
	if(animal){ //if animal?
		animal.reset(game.rnd.integerInRange(300, 400), game.rnd.integerInRange(300, 400));
	}
}

function checkIfOverCage(object) {
	game.physics.arcade.overlap(object, cages, dropInCage);

}

function dropInCage(object, cage) {
	if(!object.captured){
		if(object.species == cage.frame){
			setCaptured(object);
			cageScoreValue += 1;
			cageScore.text = cageScoreValue;
			spawnAnimal();
		}
	}
}

function setCaptured(object){
	object.captured = true;
	object.inputEnabled = false;
}
