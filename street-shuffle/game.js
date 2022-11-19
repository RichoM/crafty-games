
window.onload = function () {
	var WIDTH = 360,
		HEIGHT = 300;
    Crafty.init(WIDTH, HEIGHT);
	
	// Load scene
	Crafty.scene("Load", function() {
		Crafty.background("#000000");
		Crafty.e("2D, DOM, Text")		
			.attr({x: 10, y: 10})
			.textColor("#FFFFFF")
			.text("Loading...");
			
		//Preload sprites first
		Crafty.load(["imgs/taxi-tileset.PNG"], function() {
			Crafty.scene("Main");
		});  				
	});
	
	// Main scene
	Crafty.scene("Main", function () {
		var source = MAP_SOURCE;
		
		map = Crafty.e("2D, Canvas, TiledMapBuilder")
			.createWorld(source, function (map) {
				BuildTilesFrom(map);
			});
	});
	
	
	Crafty.scene("Load");
};

