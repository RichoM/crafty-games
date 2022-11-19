
window.onload = function () {
	var WIDTH = 1200,
		HEIGHT = 600;
    Crafty.init(WIDTH, HEIGHT);
	
	// Load scene
	Crafty.scene("Load", function() {
		Crafty.background("#000000");
		Crafty.e("2D, DOM, Text")		
			.attr({x: 10, y: 10})
			.textColor("#FFFFFF")
			.text("Loading...");
			
		//Preload sprites first
		Crafty.load(["imgs/car.2.png",
					"imgs/city-tileset.PNG"], function() { 	 
			Crafty.sprite("imgs/car.2.png", {
				Car_sprite:[0,0, 33, 55]
			});
			Crafty.scene("Main");
		});  				
	});
	
	// Main scene
	Crafty.scene("Main", function () {
		var source = MAP_SOURCE;
		
		map = Crafty.e("2D, Canvas, TiledMapBuilder")
			.createWorld(source);
		player = Crafty.e("Player");
		camera = Crafty.e("Camera")						
			.keepWithinBounds({
				top: 0,
				left: 0,
				right: source.width * source.tilewidth,
				bottom: source.height * source.tileheight
			})
			.follow(player, {x: WIDTH / 2, y: HEIGHT / 2});
			
		fps = Crafty.e("2D, DOM, Text, FPS")
			.attr({x: 10, y: 10, maxValues:10})
			.textColor("#FF0000")
			.bind("MessureFPS",function(fps){
				document.title = "FPS: "+ fps.value;
				this.text(document.title);
			});
		camera.attach(fps);
	});
	
	
	Crafty.scene("Load");
};

