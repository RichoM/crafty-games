
window.onload = function () {
    Crafty.init();
	// Load scene
	Crafty.scene("Load", function() {
		Crafty.background("#000000");
		Crafty.e("2D, DOM, Text")		
			.attr({x: 10, y: 10})
			.textColor("#FFFFFF")
			.text("Loading...");
			
		//Preload sprites first
		Crafty.load(["assets/background.png",
					"assets/menu1.png",
					"assets/player.platform.png",
					"assets/foe.platform.png",
					"assets/player.hp.png",
					"assets/foe.hp.png",
					"assets/charmander.back.png",
					"assets/squirtle.front.png"], function() { 	 
					
			Crafty.sprite("assets/background.png", {
				Background_sprite: [0, 0, 240, 160]
			});
			Crafty.sprite("assets/menu1.png", {
				Menu1_sprite: [0, 0, 120, 48]
			});
			Crafty.sprite("assets/player.platform.png", {
				PlayerPlatform_sprite: [0, 0, 125, 11]
			});
			Crafty.sprite("assets/foe.platform.png", {
				FoePlatform_sprite: [0, 0, 128, 32]
			});
			Crafty.sprite("assets/player.hp.png", {
				PlayerHp_sprite: [0, 0, 104, 37]
			});
			Crafty.sprite("assets/foe.hp.png", {
				FoeHp_sprite: [0, 0, 100, 29]
			});
			Crafty.sprite("assets/charmander.back.png", {
				CharmanderBack_sprite: [0, 0, 64, 64]
			});
			Crafty.sprite("assets/squirtle.front.png", {
				SquirtleFront_sprite: [0, 0, 64, 64]
			});

			Crafty.scene("Main");
		});  				
	});
	
	// Main scene
	Crafty.scene("Main", function () {
		Crafty.e("2D, Canvas, Draggable, Background_sprite")
			.attr({x: 0, y: 0});
		Crafty.e("2D, Canvas, Draggable, Menu1_sprite")
			.attr({x: 120, y: 112});
		Crafty.e("2D, Canvas, Draggable, PlayerPlatform_sprite")
			.attr({x: 3, y: 101});
		Crafty.e("2D, Canvas, Draggable, FoePlatform_sprite")
			.attr({x: 112, y: 48});
		Crafty.e("2D, Canvas, Draggable, PlayerHp_sprite")
			.attr({x: 126, y: 74});
		Crafty.e("2D, Canvas, Draggable, FoeHp_sprite")
			.attr({x: 13, y: 16});
		charmander = Crafty.e("2D, Canvas, Draggable, CharmanderBack_sprite")
			.attr({x: 41, y: 62});
		Crafty.e("2D, Canvas, Draggable, SquirtleFront_sprite")
			.attr({x: 144, y: 20});
		
		
		Crafty.viewport.scale(2);
	});
	
	
	Crafty.scene("Load");
};

